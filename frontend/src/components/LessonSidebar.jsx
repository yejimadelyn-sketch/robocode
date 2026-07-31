import React from 'react';
import { BookOpen, ChevronRight, Lightbulb } from 'lucide-react';
import { SoundButton } from './SoundButton';

const LessonSidebar = ({ lessons, activeLessonIndex, onSelectLesson }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', height: '100%', overflowY: 'auto', paddingRight: '1rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem', color: 'var(--text-primary)' }}>
        <BookOpen size={20} color="var(--accent-color)" />
        <h2 style={{ margin: 0, fontSize: '1.2rem' }}>Curriculum</h2>
      </div>
      
      {lessons.map((lesson, index) => (
        <SoundButton
          key={index}
          onClick={() => onSelectLesson(index)}
          style={{
            padding: '1rem',
            textAlign: 'left',
            background: activeLessonIndex === index ? 'var(--bg-secondary)' : 'transparent',
            border: '1px solid',
            borderColor: activeLessonIndex === index ? 'var(--accent-color)' : 'transparent',
            borderRadius: '0.5rem',
            color: activeLessonIndex === index ? 'var(--accent-color)' : 'var(--text-primary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            marginBottom: '0.5rem'
          }}
        >
          <span style={{ fontWeight: activeLessonIndex === index ? 600 : 400, fontSize: '0.9rem' }}>
            {lesson.title}
          </span>
          {activeLessonIndex === index && <ChevronRight size={16} />}
        </SoundButton>
      ))}

      <div style={{ marginTop: '2rem', padding: '1rem', background: 'var(--bg-secondary)', borderRadius: '0.5rem' }}>
        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>
          <Lightbulb size={16} color="#eab308" />
          <strong style={{ fontSize: '0.9rem' }}>Tip</strong>
        </div>
        <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.5 }}>
          Select a lesson to load the starter code into the editor. You can edit the code and hit 'Run' to see the output instantly!
        </p>
      </div>
    </div>
  );
};

export default LessonSidebar;
