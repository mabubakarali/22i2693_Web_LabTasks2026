import React from 'react';
import { Link } from 'react-router-dom';
import { recipesData } from '../data';
import RecipeCard from '../components/RecipeCard';
import { ArrowRight } from 'lucide-react';

export default function RecipeHome() {
  const featured = recipesData.slice(0, 3); // Pick first 3 as featured

  return (
    <div style={{ animation: 'fadeIn 0.5s ease' }}>
      <div style={{ 
        padding: '3rem', 
        borderRadius: '20px', 
        background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.2), rgba(26, 34, 53, 0.8))',
        marginBottom: '3rem',
        border: '1px solid var(--glass-border)'
      }}>
        <h1 style={{ fontSize: '3rem', marginBottom: '1rem', color: 'var(--task1-color)' }}>Welcome to Your Digital Recipe Book</h1>
        <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', maxWidth: '600px', marginBottom: '2rem' }}>
          Discover culinary delights, save your favorites to your weekly meal plan, and explore instructions.
        </p>
        <Link to="/task1/recipes">
          <button style={{ 
            background: 'var(--task1-color)', color: '#fff', 
            padding: '0.8rem 2rem', borderRadius: '8px', 
            fontWeight: '600', display: 'flex', alignItems: 'center', gap: '0.5rem' 
          }}>
            Browse Recipes <ArrowRight size={18} />
          </button>
        </Link>
      </div>

      <h2 style={{ marginBottom: '1.5rem', fontSize: '2rem' }}>Featured Recipes</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2rem' }}>
        {featured.map(recipe => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </div>
    </div>
  );
}
