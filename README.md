# RoboCode

RoboCode is a powerful, dual-engine web application that combines a professional Python learning environment with an enterprise-grade medical data science suite (the PheTK Pipeline Wizard).

## Features
* **PheTK Pipeline Wizard:** A visual 4-step wizard that connects directly to a Python backend to translate raw ICD codes into standardized Phecodes, perform multithreaded logistic regression, and generate beautiful Manhattan plots.
* **Educational Code Editor:** A VS-Code powered editor (Monaco) in your browser with real-time syntax highlighting.
* **AI Debugger:** A built-in Google Gemini assistant that reads your code and terminal output to offer highly specific debugging advice.
* **Interactive Curriculum:** Copy-pasteable Python tutorials.

## Prerequisites
To run this project on your own machine, you must have the following installed:
1. [Node.js](https://nodejs.org/en) (v18 or higher)
2. [Python](https://www.python.org/downloads/) (v3.8 or higher)
3. A Google Gemini API Key

## Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yejimadelyn-sketch/robocode.git
   cd robocode
   ```

2. **Setup the Backend (Node.js & Python):**
   ```bash
   cd backend
   npm install
   
   # Install the required Python packages (including the custom PheTK library)
   pip install -r requirements.txt
   
   # Set up your environment variables
   cp .env.example .env
   # Edit the .env file and paste in your GEMINI_API_KEY
   ```

3. **Setup the Frontend (React):**
   ```bash
   # Open a new terminal window
   cd ../frontend
   npm install
   ```

## Running the Application
You will need to run the frontend and backend simultaneously in two separate terminal windows.

**Terminal 1 (Backend):**
```bash
cd backend
node server.js
```
*(The backend runs on http://localhost:3001)*

**Terminal 2 (Frontend):**
```bash
cd frontend
npm run dev
```
*(The frontend runs on http://localhost:5173)*

Navigate to `http://localhost:5173` in your browser, and RoboCode will be live!
