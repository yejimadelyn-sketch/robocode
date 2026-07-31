import React, { useState } from 'react';
import { Upload, ArrowRight, Play, BarChart2, Activity, CheckCircle2, Loader2, Image as ImageIcon } from 'lucide-react';
import { api, getBaseUrl } from '../services/api';
import { SoundButton } from '../components/SoundButton';
import PheTKWalkthrough from '../components/PheTKWalkthrough';

const PheTKWizardPage = () => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  // Form State
  const [phenoFile, setPhenoFile] = useState(null);
  const [cohortFile, setCohortFile] = useState(null);
  const [idCol, setIdCol] = useState('person_id');
  const [icdCol, setIcdCol] = useState('ICD');
  const [indepVar, setIndepVar] = useState('independent_variable_of_interest');
  const [covariates, setCovariates] = useState('age,sex');
  
  // Results State
  const [mappedFile, setMappedFile] = useState('');
  const [statsFile, setStatsFile] = useState('');
  const [plotUrl, setPlotUrl] = useState('');
  
  // Console Output
  const [logs, setLogs] = useState('');
  
  const handleFileUpload = (e, setFile) => {
    setFile(e.target.files[0]);
  };

  const downloadSampleFile = (type) => {
    let content = '';
    let filename = '';
    if (type === 'pheno') {
      filename = 'sample_phenotype_ICD.csv';
      content = 'person_id,ICD\\nP-1001,250.0\\nP-1001,401.1\\nP-1002,250.0\\nP-1003,401.1\\nP-1004,272.0\\nP-1005,250.0\\nP-1006,401.1\\nP-1007,272.0\\nP-1008,250.0';
    } else {
      filename = 'sample_cohort_demographics.csv';
      content = 'person_id,age,sex,independent_variable_of_interest\\nP-1001,45,M,1\\nP-1002,52,F,0\\nP-1003,61,F,1\\nP-1004,39,M,1\\nP-1005,50,F,0\\nP-1006,48,M,1\\nP-1007,55,F,0\\nP-1008,44,M,1';
    }
    const blob = new Blob([content], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleNextStep = async () => {
    setError('');
    setLoading(true);
    setLogs('');
    
    try {
      if (step === 1) {
        // Upload Files
        if (!phenoFile || !cohortFile) {
          throw new Error('Please upload both Phenotype and Cohort CSV files.');
        }
        
        const formData = new FormData();
        formData.append('phenoFile', phenoFile);
        formData.append('cohortFile', cohortFile);
        
        setLogs('Uploading files to server...\n');
        const uploadData = await api.uploadPheTKFiles(phenoFile, cohortFile);
        if (!uploadData.success) throw new Error('Upload failed');
        
        // Run Map Step
        setLogs(prev => prev + 'Running Mapping Step...\n');
        const mapData = await api.runPheTKStep('map', {
          'pheno-file': uploadData.phenoFilePath,
          'id-col': idCol,
          'icd-col': icdCol,
          'output-file': 'mapped_pheno_counts.csv'
        });
        if (!mapData.success) throw new Error(mapData.details || 'Mapping failed');
        
        setLogs(prev => prev + mapData.stdout + '\nMapping complete!\n');
        setMappedFile('mapped_pheno_counts.csv');
        // Store cohort file path for next step
        setCohortFile(uploadData.cohortFilePath);
        
      } else if (step === 2) {
        // Run Stats Step
        setLogs('Running Statistics Engine...\n');
        const statsData = await api.runPheTKStep('stats', {
          'cohort-file': cohortFile,
          'phecode-file': mappedFile,
          'id-col': idCol,
          'independent-var': indepVar,
          'covariates': covariates,
          'output-file': 'phewas_results.csv'
        });
        if (!statsData.success) throw new Error(statsData.details || 'Stats failed');
        
        setLogs(prev => prev + statsData.stdout + '\nStatistics complete!\n');
        setStatsFile('phewas_results.csv');
        
      } else if (step === 3) {
        // Run Plot Step
        setLogs('Generating Manhattan Plot...\n');
        const plotData = await api.runPheTKStep('plot', {
          'stats-file': statsFile,
          'output-file': 'manhattan_plot.png'
        });
        if (!plotData.success) throw new Error(plotData.details || 'Plotting failed');
        
        setLogs(prev => prev + plotData.stdout + '\nPlotting complete!\n');
        // Combine base URL with relative image path
        setPlotUrl(getBaseUrl() + plotData.imageUrl);
      }
      
      setStep(prev => prev + 1);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem' }}>
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h1 style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', color: 'var(--accent-color)', fontSize: '2.5rem', marginBottom: '0.5rem' }}>
          <Activity size={40} /> PheTK Pipeline
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', maxWidth: '800px', margin: '0 auto' }}>
          The complete phenome-wide association study (PheWAS) engine.
        </p>
        <div style={{ background: 'rgba(59, 130, 246, 0.1)', borderLeft: '4px solid #3b82f6', padding: '1.5rem', margin: '2rem auto 0', maxWidth: '900px', textAlign: 'left', borderRadius: '0.5rem' }}>
          <h3 style={{ margin: '0 0 1rem 0', color: '#3b82f6' }}>What is this and how does it work?</h3>
          <p style={{ color: 'var(--text-primary)', lineHeight: '1.6', margin: '0 0 1rem 0' }}>
            <strong>PheWAS</strong> stands for Phenome-Wide Association Study. It's a way for scientists to figure out how certain traits (like a gene) relate to thousands of different diseases. 
          </p>
          <ul style={{ color: 'var(--text-primary)', lineHeight: '1.6', margin: 0, paddingLeft: '1.5rem' }}>
            <li><strong>Step 1:</strong> Upload your CSV (spreadsheet) files. One file has patient diseases (ICD codes used by hospitals), and the other has patient traits (like age, sex, and genetics).</li>
            <li><strong>Step 2:</strong> We automatically translate those messy hospital ICD codes into clean "Phecodes" that researchers use.</li>
            <li><strong>Step 3:</strong> We run heavy math (logistic regression) to see if there is a statistical link between the traits and the diseases.</li>
            <li><strong>Step 4:</strong> We generate a "Manhattan Plot"—a colorful chart where every dot is a disease. If a dot is really high up, it means there is a strong link!</li>
          </ul>
        </div>
      </div>

      {/* Wizard Progress Bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '3rem', position: 'relative' }}>
        <div style={{ position: 'absolute', top: '50%', left: '0', right: '0', height: '2px', background: 'var(--border-color)', zIndex: 0 }}></div>
        {[
          { num: 1, title: 'Upload & Configure', icon: Upload },
          { num: 2, title: 'Mapping', icon: Play },
          { num: 3, title: 'Statistics', icon: BarChart2 },
          { num: 4, title: 'Visualization', icon: ImageIcon }
        ].map((s) => (
          <div key={s.num} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: 1, background: 'var(--bg-color)', padding: '0 1rem' }}>
            <div style={{ 
              width: '50px', height: '50px', borderRadius: '50%', 
              background: step >= s.num ? 'var(--accent-gradient)' : 'white',
              border: step >= s.num ? 'none' : '2px solid var(--border-color)',
              color: step >= s.num ? 'white' : 'var(--text-secondary)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              marginBottom: '0.5rem',
              boxShadow: step >= s.num ? '0 4px 15px rgba(220, 39, 67, 0.4)' : 'none',
              transition: 'all 0.3s ease'
            }}>
              {step > s.num ? <CheckCircle2 size={24} /> : <s.icon size={24} />}
            </div>
            <span style={{ fontWeight: step >= s.num ? 600 : 400, color: step >= s.num ? 'var(--text-color)' : 'var(--text-secondary)' }}>
              {s.title}
            </span>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
        {/* Left Column: UI Controls */}
        <div className="glass-card" style={{ padding: '2rem' }}>
          
          {step === 1 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <h3>1. Data & Configuration</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Upload your patient phenotypes and cohort data. Don't have data? Use the buttons below to download our sample files!</p>
              
              {/* Phenotype File Section */}
              <div style={{ padding: '1rem', background: 'var(--bg-secondary)', borderRadius: '0.5rem', border: '1px solid var(--border-color)', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
                  <label style={{ fontWeight: 600, color: 'var(--text-primary)' }}>Phenotype Data (CSV/TSV)</label>
                  <SoundButton onClick={() => downloadSampleFile('pheno')} style={{ background: '#3b82f6', color: 'white', border: 'none', padding: '0.4rem 0.8rem', borderRadius: '0.4rem', cursor: 'pointer', fontSize: '0.8rem' }}>
                    📥 Download Sample Phenotypes
                  </SoundButton>
                </div>
                <input type="file" accept=".csv,.tsv" onChange={(e) => handleFileUpload(e, setPhenoFile)} style={{ padding: '0.5rem', border: '1px solid var(--border-color)', borderRadius: '0.5rem', color: 'var(--text-primary)' }} />
                {phenoFile && (
                  <div style={{ background: 'rgba(16, 185, 129, 0.15)', borderLeft: '4px solid #10b981', padding: '0.75rem', borderRadius: '0.4rem', color: 'var(--text-primary)', fontSize: '0.9rem', lineHeight: '1.5' }}>
                    <strong>🎉 Great job! You just uploaded the Phenotype file!</strong> That file shows the medical conditions and hospital billing diagnosis codes (ICD codes) for your patients. Now, please download and upload the Cohort Demographic file right below!
                  </div>
                )}
              </div>
              
              {/* Cohort File Section */}
              <div style={{ padding: '1rem', background: 'var(--bg-secondary)', borderRadius: '0.5rem', border: '1px solid var(--border-color)', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
                  <label style={{ fontWeight: 600, color: 'var(--text-primary)' }}>Genotype / Cohort Data (CSV/TSV)</label>
                  <SoundButton onClick={() => downloadSampleFile('cohort')} style={{ background: '#10b981', color: 'white', border: 'none', padding: '0.4rem 0.8rem', borderRadius: '0.4rem', cursor: 'pointer', fontSize: '0.8rem' }}>
                    📥 Download Sample Cohort Data
                  </SoundButton>
                </div>
                <input type="file" accept=".csv,.tsv" onChange={(e) => handleFileUpload(e, setCohortFile)} style={{ padding: '0.5rem', border: '1px solid var(--border-color)', borderRadius: '0.5rem', color: 'var(--text-primary)' }} />
                {cohortFile && (
                  <div style={{ background: 'rgba(59, 130, 246, 0.15)', borderLeft: '4px solid #3b82f6', padding: '0.75rem', borderRadius: '0.4rem', color: 'var(--text-primary)', fontSize: '0.9rem', lineHeight: '1.5' }}>
                    <strong>✅ Excellent! You uploaded the Cohort file!</strong> This file shows vital demographics (like Age and Sex) as well as the genetic traits under investigation. Since both files are ready, click <strong>"Upload & Map"</strong> below!
                  </div>
                )}
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginTop: '0.5rem' }}>
                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-primary)' }}>Patient ID Column</label>
                  <input type="text" value={idCol} onChange={e => setIdCol(e.target.value)} style={{ width: '100%', padding: '0.5rem', borderRadius: '0.5rem', border: '1px solid var(--border-color)', background: 'var(--bg-secondary)', color: 'var(--text-primary)' }} />
                </div>
                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-primary)' }}>ICD Code Column</label>
                  <input type="text" value={icdCol} onChange={e => setIcdCol(e.target.value)} style={{ width: '100%', padding: '0.5rem', borderRadius: '0.5rem', border: '1px solid var(--border-color)', background: 'var(--bg-secondary)', color: 'var(--text-primary)' }} />
                </div>
                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-primary)' }}>Independent Variable</label>
                  <input type="text" value={indepVar} onChange={e => setIndepVar(e.target.value)} style={{ width: '100%', padding: '0.5rem', borderRadius: '0.5rem', border: '1px solid var(--border-color)', background: 'var(--bg-secondary)', color: 'var(--text-primary)' }} />
                </div>
                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-primary)' }}>Covariates (comma separated)</label>
                  <input type="text" value={covariates} onChange={e => setCovariates(e.target.value)} style={{ width: '100%', padding: '0.5rem', borderRadius: '0.5rem', border: '1px solid var(--border-color)', background: 'var(--bg-secondary)', color: 'var(--text-primary)' }} />
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <h3 style={{ margin: 0 }}>2. Mapping Complete</h3>
              <div style={{ background: 'rgba(16, 185, 129, 0.15)', borderLeft: '4px solid #10b981', padding: '1rem', borderRadius: '0.5rem', color: 'var(--text-primary)', lineHeight: '1.5' }}>
                <strong>✨ Fantastic! Step 2 is Complete.</strong><br/>
                We just took all those messy hospital billing codes and organized them into professional research categories called <strong>Phecodes</strong>. Now press <strong>"Run PheWAS"</strong> below to calculate the statistical connections!
              </div>
              <div style={{ padding: '1rem', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '0.5rem', color: 'var(--text-primary)' }}>
                <strong>Generated File:</strong> {mappedFile}
              </div>
            </div>
          )}

          {step === 3 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <h3 style={{ margin: 0 }}>3. Statistics & Regression Complete</h3>
              <div style={{ background: 'rgba(59, 130, 246, 0.15)', borderLeft: '4px solid #3b82f6', padding: '1rem', borderRadius: '0.5rem', color: 'var(--text-primary)', lineHeight: '1.5' }}>
                <strong>🚀 Step 3 Complete! You ran multithreaded regressions!</strong><br/>
                Our engine just evaluated thousands of complex statistical formulas across all patients to compute statistical significance (p-values). Now press <strong>"Generate Plot"</strong> to draw your Manhattan Plot!
              </div>
              <div style={{ padding: '1rem', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '0.5rem', color: 'var(--text-primary)' }}>
                <strong>Generated File:</strong> {statsFile}
              </div>
            </div>
          )}

          {step === 4 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <h3 style={{ margin: 0 }}>4. Visualization Complete</h3>
              <div style={{ background: 'rgba(220, 39, 67, 0.15)', borderLeft: '4px solid var(--accent-color)', padding: '1rem', borderRadius: '0.5rem', color: 'var(--text-primary)', lineHeight: '1.5' }}>
                <strong>🏆 Congratulations! Your Manhattan Plot is ready!</strong><br/>
                Every dot on this graph is a specific human disease. Dots towering above the threshold represent statistically proven connections to your independent variable!
              </div>
              {plotUrl && (
                <img src={plotUrl} alt="Manhattan Plot" style={{ width: '100%', marginTop: '0.5rem', borderRadius: '0.5rem', border: '1px solid var(--border-color)' }} />
              )}
            </div>
          )}

          {error && (
            <div style={{ marginTop: '1rem', padding: '1rem', background: '#fee2e2', color: '#991b1b', borderRadius: '0.5rem' }}>
              {error}
            </div>
          )}

        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '2rem' }}>
          <SoundButton 
            className="btn btn-secondary" 
            onClick={() => setStep(prev => Math.max(1, prev - 1))}
            disabled={step === 1 || loading}
          >
            Back
          </SoundButton>
          <SoundButton 
            className="btn btn-primary" 
            onClick={handleNextStep}
            disabled={loading || (step === 4)}
            style={{ minWidth: '150px' }}
          >
            {loading ? <Loader2 size={18} className="animate-spin" /> : 
             step === 1 ? 'Upload & Map' : 
             step === 2 ? 'Run PheWAS' : 
             step === 3 ? 'Generate Plot' : 'Finished'}
            {!loading && step < 4 && <ArrowRight size={18} />}
          </SoundButton>
        </div>

        </div>

        {/* Right Column: Terminal Logs */}
        <div className="glass-card" style={{ padding: '1rem', background: '#1e293b', color: '#f8fafc', display: 'flex', flexDirection: 'column' }}>
          <div style={{ borderBottom: '1px solid #334155', paddingBottom: '0.5rem', marginBottom: '1rem', fontWeight: 600 }}>
            Pipeline Terminal Output
          </div>
          <pre style={{ flex: 1, margin: 0, padding: 0, background: 'transparent', color: '#a7f3d0', overflowY: 'auto', whiteSpace: 'pre-wrap', fontFamily: 'monospace' }}>
            {logs || 'Waiting for pipeline to start...'}
          </pre>
        </div>
      </div>

      {/* Interactive Walkthrough Demo */}
      <div style={{ marginTop: '5rem' }}>
        <PheTKWalkthrough />
      </div>

      {/* Programmatic Python Usage */}
      <div style={{ marginTop: '5rem', padding: '3rem 2rem', background: 'var(--bg-secondary)', borderRadius: '1rem', border: '1px solid var(--border-color)' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '1rem', fontSize: '2.5rem' }}>Use PheTK with <span className="text-gradient">Pure Python</span></h2>
        <p style={{ textAlign: 'center', color: 'var(--text-secondary)', maxWidth: '800px', margin: '0 auto 3rem auto', fontSize: '1.1rem', lineHeight: '1.6' }}>
          Are you an advanced researcher who prefers writing code? You can run the entire PheTK pipeline programmatically using Python! Copy these scripts and paste them into our built-in Code Editor to run them securely in your browser.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
          
          <div className="glass-card" style={{ padding: '2rem' }}>
            <h3 style={{ color: 'var(--accent-color)' }}>1. Generate Demo Data</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1rem' }}>Create synthetic CSV files if you don't have your own patient data.</p>
            <pre style={{ background: '#0f172a', padding: '1rem', borderRadius: '0.5rem', color: '#38bdf8', fontSize: '0.8rem', overflowX: 'auto', border: '1px solid #334155' }}>
{`from PheTK.Demo import generate_examples

# Generates phenotype and cohort files
generate_examples(num_patients=5000)`}
            </pre>
          </div>

          <div className="glass-card" style={{ padding: '2rem' }}>
            <h3 style={{ color: 'var(--accent-color)' }}>2. Run the PheWAS Pipeline</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1rem' }}>Map codes, run regression stats, and save the results in just 3 lines of code.</p>
            <pre style={{ background: '#0f172a', padding: '1rem', borderRadius: '0.5rem', color: '#38bdf8', fontSize: '0.8rem', overflowX: 'auto', border: '1px solid #334155' }}>
{`from PheTK.PheWAS import PheWAS

engine = PheWAS('pheno.csv', 'cohort.csv')
engine.map_codes()
engine.run_regression(indep_var='mutation')`}
            </pre>
          </div>

          <div className="glass-card" style={{ padding: '2rem' }}>
            <h3 style={{ color: 'var(--accent-color)' }}>3. Generate Manhattan Plot</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1rem' }}>Pass your results directly into the plotter to visualize significant diseases.</p>
            <pre style={{ background: '#0f172a', padding: '1rem', borderRadius: '0.5rem', color: '#38bdf8', fontSize: '0.8rem', overflowX: 'auto', border: '1px solid #334155' }}>
{`from PheTK.Plot import ManhattanPlot

# Reads the generated stats and plots
ManhattanPlot('phewas_results.csv').save()`}
            </pre>
          </div>

        </div>

        <div style={{ textAlign: 'center', marginTop: '3rem' }}>
          <a href="/runner" className="btn btn-primary" style={{ padding: '1rem 2rem', fontSize: '1.1rem', textDecoration: 'none' }}>
            Open Code Editor to Try It
          </a>
        </div>
      </div>
    </div>
  );
};

export default PheTKWizardPage;
