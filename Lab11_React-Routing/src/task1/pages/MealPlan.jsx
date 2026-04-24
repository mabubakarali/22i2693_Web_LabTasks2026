import React, { useState, useEffect } from 'react';
import { recipesData } from '../data';
import RecipeCard from '../components/RecipeCard';
import { CalendarHeart } from 'lucide-react';

export default function MealPlan() {
  const [mealPlanRecipes, setMealPlanRecipes] = useState([]);

  useEffect(() => {
    const mealPlanIds = JSON.parse(localStorage.getItem('lab13_mealplan') || '[]');
    const savedRecipes = recipesData.filter(r => mealPlanIds.includes(r.id));
    setMealPlanRecipes(savedRecipes);
  }, []);

  return (
    <div style={{ animation: 'fadeIn 0.5s ease' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
        <div style={{ background: 'rgba(16, 185, 129, 0.2)', padding: '1rem', borderRadius: '12px' }}>
          <CalendarHeart size={32} color="var(--task1-color)" />
        </div>
        <div>
          <h1 style={{ fontSize: '2.5rem', margin: 0 }}>Your Weekly Meal Plan</h1>
          <p style={{ color: 'var(--text-secondary)' }}>Recipes you have saved for the week.</p>
        </div>
      </div>

      {mealPlanRecipes.length === 0 ? (
        <div className="glass-panel" style={{ padding: '4rem 2rem', textAlign: 'center' }}>
          <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>No recipes in your meal plan yet.</p>
          <a href="/task1/recipes" style={{ color: 'var(--task1-color)', fontWeight: 'bold' }}>Browse recipes to add some!</a>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2rem' }}>
          {mealPlanRecipes.map(recipe => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      )}
    </div>
  );
}
