require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const { GoogleGenAI } = require('@google/genai');
const multer = require('multer');

const app = express();
const port = 3001;

// Initialize Gemini client
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

app.use(cors());
app.use(express.json());

const TEMP_DIR = path.join(__dirname, 'temp');

// Ensure temp directory exists
if (!fs.existsSync(TEMP_DIR)){
    fs.mkdirSync(TEMP_DIR);
}

// Setup multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, TEMP_DIR),
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage });

// Serve static files from the temp directory for accessing plots
app.use('/temp', express.static(TEMP_DIR));

// Create a wrapper script to run python code like a Jupyter notebook
const WRAPPER_SCRIPT_PATH = path.join(TEMP_DIR, 'jupyter_wrapper.py');
const wrapperCode = `
import ast
import sys

with open(sys.argv[1], 'r', encoding='utf-8') as f:
    code_str = f.read()

try:
    tree = ast.parse(code_str)
except Exception:
    exec(code_str)
    sys.exit(0)

if not tree.body:
    sys.exit(0)

last_stmt = tree.body[-1]

env = {}
if isinstance(last_stmt, ast.Expr):
    module = ast.Module(tree.body[:-1], type_ignores=[])
    exec_code = compile(module, '<string>', 'exec')
    eval_expr = ast.Expression(last_stmt.value)
    eval_code = compile(eval_expr, '<string>', 'eval')
    
    exec(exec_code, env)
    result = eval(eval_code, env)
    if result is not None:
        if hasattr(result, '_repr_html_'):
            with open(sys.argv[1] + '.html', 'w', encoding='utf-8') as f:
                f.write(result._repr_html_())
        else:
            print(repr(result))
else:
    exec(code_str, env)
`;
fs.writeFileSync(WRAPPER_SCRIPT_PATH, wrapperCode);

app.post('/api/run-script', (req, res) => {
    const { code } = req.body;
    
    if (!code) {
        return res.status(400).json({ error: 'No code provided' });
    }

    // Generate a unique identifier for this run to avoid file conflicts
    const runId = crypto.randomBytes(8).toString('hex');
    const scriptPath = path.join(TEMP_DIR, `script_${runId}.py`);
    
    // Write the python code to a file
    fs.writeFileSync(scriptPath, code);

    // Determine correct python command based on OS
    const pythonCmd = process.platform === 'win32' ? 'py' : 'python3';
    const pythonProcess = spawn(pythonCmd, [WRAPPER_SCRIPT_PATH, scriptPath], { cwd: TEMP_DIR });

    let stdout = '';
    let stderr = '';

    pythonProcess.stdout.on('data', (data) => {
        stdout += data.toString();
    });

    pythonProcess.stderr.on('data', (data) => {
        stderr += data.toString();
    });

    pythonProcess.on('close', (code) => {
        // Find any newly generated plots
        const files = fs.readdirSync(TEMP_DIR);
        const images = files
            .filter(f => f.endsWith('.png') || f.endsWith('.gif') || f.endsWith('.jpg'))
            .map(f => `http://localhost:3001/temp/${f}`);

        let htmlOutput = null;
        const htmlPath = `${scriptPath}.html`;
        if (fs.existsSync(htmlPath)) {
            htmlOutput = fs.readFileSync(htmlPath, 'utf-8');
        }

        res.json({
            runId: runId,
            stdout: stdout,
            stderr: stderr,
            exitCode: code,
            images: images,
            html: htmlOutput
        });
    });
});

app.post('/api/chat', async (req, res) => {
    const { message, chatHistory, code, errorLogs } = req.body;
    
    if (!message) {
        return res.status(400).json({ error: 'No message provided' });
    }

    try {
        // Construct a system prompt based on current editor state
        let systemPrompt = "You are RoboCode, an AI coding assistant built directly into a Python web IDE. ";
        systemPrompt += "Your job is to help the user debug and write Python code. Keep answers concise, friendly, and helpful. ";
        
        let promptText = "";
        if (code) {
            promptText += `Here is the user's current code:\n\`\`\`python\n${code}\n\`\`\`\n\n`;
        }
        if (errorLogs) {
            promptText += `Here is the error output they recently received:\n\`\`\`\n${errorLogs}\n\`\`\`\n\n`;
        }
        promptText += `User message: ${message}`;

        // Create conversational history for the model
        // Convert history format to genai format
        // genai format: { role: "user" | "model", parts: [{text: "..."}] }
        const formattedHistory = (chatHistory || []).filter(msg => msg.role !== 'system').map(msg => ({
            role: msg.role === 'assistant' ? 'model' : 'user',
            parts: [{ text: msg.content }]
        }));

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: [
                ...formattedHistory,
                { role: 'user', parts: [{ text: promptText }] }
            ],
            config: {
                systemInstruction: systemPrompt
            }
        });

        res.json({ reply: response.text });
    } catch (error) {
        console.error('AI Chat Error:', error);
        res.status(500).json({ error: 'Failed to generate AI response. Please check your API key.' });
    }
});



app.listen(port, () => {
    console.log(`Backend server listening at http://localhost:${port}`);
});
