import React from 'react';
import { Activity, Stethoscope, Pill, Syringe } from 'lucide-react';
import { motion } from 'framer-motion';

const RecordCard = ({ record }) => {
  const getIcon = () => {
    switch(record.type) {
      case 'Diagnosis': return <Stethoscope size={20} color="#f43f5e" />;
      case 'Medication': return <Pill size={20} color="#3b82f6" />;
      case 'Lab Test': return <Activity size={20} color="#10b981" />;
      case 'Procedure': return <Syringe size={20} color="#eab308" />;
      default: return <Activity size={20} />;
    }
  };

  return (
    <motion.div 
      className="glass-card" 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      whileHover={{ scale: 1.02 }}
      style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', borderLeft: `4px solid ${record.type === 'Diagnosis' ? '#f43f5e' : record.type === 'Medication' ? '#3b82f6' : record.type === 'Lab Test' ? '#10b981' : '#eab308'}` }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          {getIcon()} {record.type}
        </span>
        <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{record.date}</span>
      </div>
      <h3 style={{ margin: '0.5rem 0', color: 'var(--text-primary)', fontSize: '1.2rem' }}>{record.title}</h3>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '0.5rem' }}>
        <div><strong>Patient ID:</strong> {record.patientId}</div>
        <div><strong>Age:</strong> {record.age}</div>
        <div style={{ gridColumn: 'span 2' }}>
          <strong>Details:</strong> {record.details}
        </div>
      </div>
    </motion.div>
  );
};

export default RecordCard;
