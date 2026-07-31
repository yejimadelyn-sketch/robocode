import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Users, FileText, Activity } from 'lucide-react';

const SummaryDashboard = ({ records }) => {
  const stats = useMemo(() => {
    const totalRecords = records.length;
    const uniquePatients = new Set(records.map(r => r.patientId)).size;
    const avgAge = records.length > 0 
      ? Math.round(records.reduce((acc, r) => acc + r.age, 0) / records.length) 
      : 0;
    
    const typeBreakdown = records.reduce((acc, r) => {
      acc[r.type] = (acc[r.type] || 0) + 1;
      return acc;
    }, {});

    return { totalRecords, uniquePatients, avgAge, typeBreakdown };
  }, [records]);

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', marginTop: '1rem' }}>
      <motion.div className="glass-card" initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} style={{ padding: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
        <FileText size={32} color="var(--accent-color)" style={{ marginBottom: '1rem' }} />
        <h3 style={{ fontSize: '2rem', margin: 0 }}>{stats.totalRecords}</h3>
        <p style={{ color: 'var(--text-secondary)', margin: 0 }}>Total Records</p>
      </motion.div>

      <motion.div className="glass-card" initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.1 }} style={{ padding: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
        <Users size={32} color="#3b82f6" style={{ marginBottom: '1rem' }} />
        <h3 style={{ fontSize: '2rem', margin: 0 }}>{stats.uniquePatients}</h3>
        <p style={{ color: 'var(--text-secondary)', margin: 0 }}>Unique Patients</p>
      </motion.div>

      <motion.div className="glass-card" initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.2 }} style={{ padding: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
        <Activity size={32} color="#10b981" style={{ marginBottom: '1rem' }} />
        <h3 style={{ fontSize: '2rem', margin: 0 }}>{stats.avgAge}</h3>
        <p style={{ color: 'var(--text-secondary)', margin: 0 }}>Average Age</p>
      </motion.div>

      <motion.div className="glass-card" initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.3 }} style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', gridColumn: '1 / -1' }}>
        <h4 style={{ margin: '0 0 1rem 0' }}>Record Type Breakdown</h4>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          {Object.entries(stats.typeBreakdown).map(([type, count]) => (
            <div key={type} style={{ padding: '0.5rem 1rem', background: 'var(--bg-secondary)', borderRadius: '999px', fontSize: '0.9rem', display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
              <span style={{ color: 'var(--text-secondary)' }}>{type}</span>
              <strong style={{ color: 'var(--text-primary)' }}>{count}</strong>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default SummaryDashboard;
