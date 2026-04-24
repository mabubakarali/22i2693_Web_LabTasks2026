import React from 'react';
import { Shield, Zap, BookOpen, Fingerprint } from 'lucide-react';

export default function ClassesInfo() {
  const classes = [
    { name: "Scientists", icon: <Zap size={32} color="#f59e0b" />, desc: "High intelligence characters capable of traversing dimensions." },
    { name: "Warriors", icon: <Shield size={32} color="#ef4444" />, desc: "Combat-focused beings found across the multiverse." },
    { name: "Bureaucrats", icon: <BookOpen size={32} color="#3b82f6" />, desc: "Members of the Galactic Federation and similar agencies." },
    { name: "Anomalies", icon: <Fingerprint size={32} color="#10b981" />, desc: "Unique mutants, chronofact clones, and undiscovered species." }
  ];

  return (
    <div style={{ animation: 'fadeIn 0.5s ease', maxWidth: '800px', margin: '0 auto' }}>
      <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem', textAlign: 'center' }}>Character Classes Reference</h1>
      <p style={{ color: 'var(--text-secondary)', textAlign: 'center', marginBottom: '3rem' }}>
        While the multiverse is vast, most entities generally fit into these broad operational categories.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1.5rem' }}>
        {classes.map((cls, idx) => (
          <div key={idx} className="glass-panel" style={{ padding: '2rem', display: 'flex', alignItems: 'center', gap: '2rem', transition: 'transform 0.3s', cursor: 'default' }}
               onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.02)'}
               onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}>
            <div style={{ background: 'var(--surface-color)', padding: '1.5rem', borderRadius: '50%' }}>
              {cls.icon}
            </div>
            <div>
              <h2 style={{ fontSize: '1.8rem', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>{cls.name}</h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem' }}>{cls.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
