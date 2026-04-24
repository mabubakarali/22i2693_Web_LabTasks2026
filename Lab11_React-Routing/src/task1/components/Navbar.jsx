import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { ChefHat, BookOpen, CalendarHeart, Home } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="glass-panel" style={{ margin: '1rem', padding: '1rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <Link to="/task1" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.2rem', fontWeight: '700', color: 'var(--task1-color)' }}>
        <ChefHat size={28} /> Lab13 Recipes
      </Link>
      
      <div style={{ display: 'flex', gap: '1.5rem' }}>
        <NavLink to="/task1" end style={({ isActive }) => ({ 
          color: isActive ? 'var(--task1-color)' : 'var(--text-primary)',
          fontWeight: isActive ? '600' : '400',
          display: 'flex', alignItems: 'center', gap: '0.4rem'
        })}>
          <Home size={18} /> Home
        </NavLink>
        <NavLink to="/task1/recipes" style={({ isActive }) => ({ 
          color: isActive ? 'var(--task1-color)' : 'var(--text-primary)',
          fontWeight: isActive ? '600' : '400',
          display: 'flex', alignItems: 'center', gap: '0.4rem'
        })}>
          <BookOpen size={18} /> All Recipes
        </NavLink>
        <NavLink to="/task1/meal-plan" style={({ isActive }) => ({ 
          color: isActive ? 'var(--task1-color)' : 'var(--text-primary)',
          fontWeight: isActive ? '600' : '400',
          display: 'flex', alignItems: 'center', gap: '0.4rem'
        })}>
          <CalendarHeart size={18} /> Meal Plan
        </NavLink>
      </div>
      <Link to="/" style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>&larr; Back to Hub</Link>
    </nav>
  );
}
