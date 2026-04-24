import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Gamepad2, Users, Heart, BookOpen } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="glass-panel" style={{ margin: '1rem', padding: '1rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <Link to="/task3" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.2rem', fontWeight: '700', color: 'var(--task3-color)' }}>
        <Gamepad2 size={28} /> Character Explorer
      </Link>
      
      <div style={{ display: 'flex', gap: '1.5rem' }}>
        <NavLink to="/task3" end style={({ isActive }) => ({ 
          color: isActive ? 'var(--task3-color)' : 'var(--text-primary)',
          fontWeight: isActive ? '600' : '400',
          display: 'flex', alignItems: 'center', gap: '0.4rem'
        })}>
          <Users size={18} /> Roster
        </NavLink>
        <NavLink to="/task3/classes" style={({ isActive }) => ({ 
          color: isActive ? 'var(--task3-color)' : 'var(--text-primary)',
          fontWeight: isActive ? '600' : '400',
          display: 'flex', alignItems: 'center', gap: '0.4rem'
        })}>
          <BookOpen size={18} /> Classes
        </NavLink>
        <NavLink to="/task3/favorites" style={({ isActive }) => ({ 
          color: isActive ? 'var(--task3-color)' : 'var(--text-primary)',
          fontWeight: isActive ? '600' : '400',
          display: 'flex', alignItems: 'center', gap: '0.4rem'
        })}>
          <Heart size={18} /> Favorites
        </NavLink>
      </div>
      <Link to="/" style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>&larr; Back to Hub</Link>
    </nav>
  );
}
