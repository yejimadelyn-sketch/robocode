import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, LayoutGrid, List, PieChart } from 'lucide-react';
import RecordCard from '../components/ehr/RecordCard';
import SummaryDashboard from '../components/ehr/SummaryDashboard';
import { SoundButton } from '../components/SoundButton';

// Mock Data
const MOCK_RECORDS = [
  { id: '1', patientId: 'P-1001', age: 45, type: 'Diagnosis', title: 'Type 2 Diabetes', details: 'Newly diagnosed. HbA1c 7.5%.', date: '2023-10-15' },
  { id: '2', patientId: 'P-1001', age: 45, type: 'Medication', title: 'Metformin 500mg', details: 'Take twice daily with meals.', date: '2023-10-15' },
  { id: '3', patientId: 'P-1002', age: 32, type: 'Lab Test', title: 'Comprehensive Metabolic Panel', details: 'All results within normal limits.', date: '2023-11-02' },
  { id: '4', patientId: 'P-1003', age: 61, type: 'Procedure', title: 'Appendectomy', details: 'Laparoscopic removal. Uncomplicated.', date: '2023-09-20' },
  { id: '5', patientId: 'P-1004', age: 55, type: 'Diagnosis', title: 'Hypertension', details: 'BP 145/90.', date: '2023-12-05' },
  { id: '6', patientId: 'P-1004', age: 55, type: 'Medication', title: 'Lisinopril 10mg', details: 'Take once daily in the morning.', date: '2023-12-05' },
  { id: '7', patientId: 'P-1005', age: 28, type: 'Lab Test', title: 'Lipid Panel', details: 'LDL 110. HDL 55.', date: '2024-01-10' },
];

const EhrDashboardPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState('card'); // 'card', 'table', 'summary'

  // Filter records based on search term
  const filteredRecords = useMemo(() => {
    if (!searchTerm) return MOCK_RECORDS;
    const lower = searchTerm.toLowerCase();
    return MOCK_RECORDS.filter(record => 
      record.title.toLowerCase().includes(lower) ||
      record.type.toLowerCase().includes(lower) ||
      record.details.toLowerCase().includes(lower) ||
      record.patientId.toLowerCase().includes(lower)
    );
  }, [searchTerm]);

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem' }}>
      
      {/* Header & Controls */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ margin: 0, fontSize: '2.5rem' }}>Patient <span className="text-gradient">Records</span></h1>
          <p style={{ color: 'var(--text-secondary)', margin: '0.5rem 0 0 0' }}>Interactive Electronic Health Records Explorer</p>
        </div>

        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          {/* Search Bar */}
          <div style={{ position: 'relative', width: '250px' }}>
            <Search size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
            <input 
              type="text" 
              placeholder="Search records..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ width: '100%', padding: '0.75rem 1rem 0.75rem 2.5rem', borderRadius: '999px', border: '1px solid var(--border-color)', background: 'var(--bg-secondary)', color: 'var(--text-primary)', outline: 'none' }}
            />
          </div>

          {/* View Toggles */}
          <div style={{ display: 'flex', background: 'var(--bg-secondary)', padding: '0.25rem', borderRadius: '999px' }}>
            <SoundButton 
              onClick={() => setViewMode('card')}
              style={{ background: viewMode === 'card' ? 'var(--accent-gradient)' : 'transparent', color: viewMode === 'card' ? 'white' : 'var(--text-secondary)', border: 'none', padding: '0.5rem 1rem', borderRadius: '999px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
            >
              <LayoutGrid size={16} /> Card
            </SoundButton>
            <SoundButton 
              onClick={() => setViewMode('table')}
              style={{ background: viewMode === 'table' ? 'var(--accent-gradient)' : 'transparent', color: viewMode === 'table' ? 'white' : 'var(--text-secondary)', border: 'none', padding: '0.5rem 1rem', borderRadius: '999px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
            >
              <List size={16} /> Table
            </SoundButton>
            <SoundButton 
              onClick={() => setViewMode('summary')}
              style={{ background: viewMode === 'summary' ? 'var(--accent-gradient)' : 'transparent', color: viewMode === 'summary' ? 'white' : 'var(--text-secondary)', border: 'none', padding: '0.5rem 1rem', borderRadius: '999px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
            >
              <PieChart size={16} /> Summary
            </SoundButton>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <AnimatePresence mode="wait">
        
        {viewMode === 'card' && (
          <motion.div 
            key="card-view"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}
          >
            {filteredRecords.map(record => (
              <RecordCard key={record.id} record={record} />
            ))}
            {filteredRecords.length === 0 && <p style={{ color: 'var(--text-secondary)' }}>No records found.</p>}
          </motion.div>
        )}

        {viewMode === 'table' && (
          <motion.div 
            key="table-view"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="glass-card"
            style={{ padding: '0', overflow: 'hidden' }}
          >
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr style={{ background: 'var(--bg-secondary)', borderBottom: '1px solid var(--border-color)' }}>
                  <th style={{ padding: '1rem', color: 'var(--text-secondary)', fontWeight: 600 }}>Date</th>
                  <th style={{ padding: '1rem', color: 'var(--text-secondary)', fontWeight: 600 }}>Patient ID</th>
                  <th style={{ padding: '1rem', color: 'var(--text-secondary)', fontWeight: 600 }}>Type</th>
                  <th style={{ padding: '1rem', color: 'var(--text-secondary)', fontWeight: 600 }}>Title</th>
                  <th style={{ padding: '1rem', color: 'var(--text-secondary)', fontWeight: 600 }}>Details</th>
                </tr>
              </thead>
              <tbody>
                {filteredRecords.map(record => (
                  <tr key={record.id} style={{ borderBottom: '1px solid var(--border-card)', color: 'var(--text-primary)' }}>
                    <td style={{ padding: '1rem' }}>{record.date}</td>
                    <td style={{ padding: '1rem' }}>{record.patientId}</td>
                    <td style={{ padding: '1rem' }}>
                      <span style={{ 
                        padding: '0.25rem 0.5rem', 
                        borderRadius: '999px', 
                        fontSize: '0.75rem', 
                        background: record.type === 'Diagnosis' ? 'rgba(244,63,94,0.2)' : record.type === 'Medication' ? 'rgba(59,130,246,0.2)' : 'rgba(16,185,129,0.2)',
                        color: record.type === 'Diagnosis' ? '#f43f5e' : record.type === 'Medication' ? '#3b82f6' : '#10b981'
                      }}>
                        {record.type}
                      </span>
                    </td>
                    <td style={{ padding: '1rem', fontWeight: 600 }}>{record.title}</td>
                    <td style={{ padding: '1rem', color: 'var(--text-secondary)' }}>{record.details}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filteredRecords.length === 0 && <p style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-secondary)' }}>No records found.</p>}
          </motion.div>
        )}

        {viewMode === 'summary' && (
          <motion.div
            key="summary-view"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <SummaryDashboard records={filteredRecords} />
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  );
};

export default EhrDashboardPage;
