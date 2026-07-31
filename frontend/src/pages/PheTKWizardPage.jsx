import React, { useState } from 'react';
import { Upload, ArrowRight, Play, BarChart2, Activity, CheckCircle2, Loader2, Image as ImageIcon } from 'lucide-react';
import { api, getBaseUrl } from '../services/api';
import { SoundButton } from '../components/SoundButton';

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
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem' }}>
          The complete phenome-wide association study (PheWAS) engine.
        </p>
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
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Upload your raw patient phenotypes (ICD codes) and your cohort data.</p>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label style={{ fontWeight: 600 }}>Phenotype Data (CSV/TSV)</label>
                <input type="file" accept=".csv,.tsv" onChange={(e) => handleFileUpload(e, setPhenoFile)} style={{ padding: '0.5rem', border: '1px solid var(--border-color)', borderRadius: '0.5rem' }} />
              </div>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label style={{ fontWeight: 600 }}>Genotype / Cohort Data (CSV/TSV)</label>
                <input type="file" accept=".csv,.tsv" onChange={(e) => handleFileUpload(e, setCohortFile)} style={{ padding: '0.5rem', border: '1px solid var(--border-color)', borderRadius: '0.5rem' }} />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginTop: '1rem' }}>
                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: 600 }}>Patient ID Column</label>
                  <input type="text" value={idCol} onChange={e => setIdCol(e.target.value)} style={{ width: '100%', padding: '0.5rem', borderRadius: '0.5rem', border: '1px solid var(--border-color)' }} />
                </div>
                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: 600 }}>ICD Code Column</label>
                  <input type="text" value={icdCol} onChange={e => setIcdCol(e.target.value)} style={{ width: '100%', padding: '0.5rem', borderRadius: '0.5rem', border: '1px solid var(--border-color)' }} />
                </div>
                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: 600 }}>Independent Variable</label>
                  <input type="text" value={indepVar} onChange={e => setIndepVar(e.target.value)} style={{ width: '100%', padding: '0.5rem', borderRadius: '0.5rem', border: '1px solid var(--border-color)' }} />
                </div>
                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: 600 }}>Covariates (comma separated)</label>
                  <input type="text" value={covariates} onChange={e => setCovariates(e.target.value)} style={{ width: '100%', padding: '0.5rem', borderRadius: '0.5rem', border: '1px solid var(--border-color)' }} />
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <h3>2. Mapping Complete</h3>
              <p>The backend has successfully translated your raw ICD codes into grouped Phecodes.</p>
              <div style={{ padding: '1rem', background: '#f8fafc', borderRadius: '0.5rem', marginTop: '1rem' }}>
                <strong>Output:</strong> {mappedFile}
              </div>
            </div>
          )}

          {step === 3 && (
            <div>
              <h3>3. Statistics & Regression Complete</h3>
              <p>Thousands of multithreaded logistic regressions have been executed.</p>
              <div style={{ padding: '1rem', background: '#f8fafc', borderRadius: '0.5rem', marginTop: '1rem' }}>
                <strong>Output:</strong> {statsFile}
              </div>
            </div>
          )}

          {step === 4 && (
            <div>
              <h3>4. Visualization Complete</h3>
              <p>Your Manhattan plot has been generated.</p>
              {plotUrl && (
                <img src={plotUrl} alt="Manhattan Plot" style={{ width: '100%', marginTop: '1rem', borderRadius: '0.5rem', border: '1px solid var(--border-color)' }} />
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
    </div>
  );
};

export default PheTKWizardPage;
