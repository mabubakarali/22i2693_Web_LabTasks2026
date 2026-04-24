import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { TrendingUp, Settings, BarChart2 } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="glass-panel" style={{ margin: '1rem', padding: '1rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <Link to="/task2" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.2rem', fontWeight: '700', color: 'var(--task2-color)' }}>
        <TrendingUp size={28} /> Crypto Tracker
      </Link>
      
      <div style={{ display: 'flex', gap: '1.5rem' }}>
        <NavLink to="/task2" end style={({ isActive }) => ({ 
          color: isActive ? 'var(--task2-color)' : 'var(--text-primary)',
          fontWeight: isActive ? '600' : '400',
          display: 'flex', alignItems: 'center', gap: '0.4rem'
        })}>
          <BarChart2 size={18} /> Dashboard
        </NavLink>
        <NavLink to="/task2/settings" style={({ isActive }) => ({ 
          color: isActive ? 'var(--task2-color)' : 'var(--text-primary)',
          fontWeight: isActive ? '600' : '400',
          display: 'flex', alignItems: 'center', gap: '0.4rem'
        })}>
          <Settings size={18} /> Settings
        </NavLink>
      </div>
      <Link to="/" style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>&larr; Back to Hub</Link>
    </nav>
  );
}
