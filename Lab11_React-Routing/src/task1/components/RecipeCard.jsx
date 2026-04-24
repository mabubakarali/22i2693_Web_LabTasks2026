import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, Star, MapPin } from 'lucide-react';

export default function RecipeCard({ recipe }) {
  return (
    <Link to={`/task1/recipes/${recipe.id}`} className="glass-panel" style={{ 
      display: 'flex', flexDirection: 'column', overflow: 'hidden', textDecoration: 'none', transition: 'all 0.3s ease'
    }}
    onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
    onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
      <div style={{ position: 'relative', height: '200px' }}>
        <img src={recipe.image} alt={recipe.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        {recipe.isVegetarian && (
          <span style={{ position: 'absolute', top: '10px', right: '10px', background: 'rgba(16, 185, 129, 0.9)', color: 'white', padding: '4px 8px', borderRadius: '4px', fontSize: '0.8rem', fontWeight: 'bold' }}>
            Vegetarian
          </span>
        )}
      </div>
      <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
        <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>{recipe.name}</h3>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1rem', flex: 1 }}>{recipe.description}</p>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Clock size={16} /> {recipe.prepTime}m</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><MapPin size={16} /> {recipe.cuisine}</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--task2-color)' }}><Star size={16} /> {recipe.rating}</span>
        </div>
      </div>
    </Link>
  );
}
