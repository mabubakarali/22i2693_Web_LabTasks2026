import React, { useState, useEffect } from 'react';
import { recipesData } from '../data';
import RecipeCard from '../components/RecipeCard';
import { Search, Loader2 } from 'lucide-react';

export default function RecipeList() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState('');
  const [cuisineFilter, setCuisineFilter] = useState('All');
  const [difficultyFilter, setDifficultyFilter] = useState('All');
  const [sortBy, setSortBy] = useState('name'); // 'name', 'rating', 'prepTime'

  useEffect(() => {
    // Simulate loading state of 1 second
    const timer = setTimeout(() => {
      setRecipes(recipesData);
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const cuisines = ['All', ...new Set(recipesData.map(r => r.cuisine))];

  const filteredRecipes = recipes.filter(recipe => {
    const matchSearch = recipe.name.toLowerCase().includes(search.toLowerCase()) || 
                        recipe.cuisine.toLowerCase().includes(search.toLowerCase());
    const matchCuisine = cuisineFilter === 'All' || recipe.cuisine === cuisineFilter;
    const matchDiff = difficultyFilter === 'All' || recipe.difficulty === difficultyFilter;
    return matchSearch && matchCuisine && matchDiff;
  }).sort((a, b) => {
    if (sortBy === 'name') return a.name.localeCompare(b.name);
    if (sortBy === 'rating') return b.rating - a.rating;
    if (sortBy === 'prepTime') return a.prepTime - b.prepTime;
    return 0;
  });

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
        <Loader2 size={48} color="var(--task1-color)" className="spin" style={{ animation: 'spin 1s linear infinite' }} />
        <style>{`@keyframes spin { 100% { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  return (
    <div style={{ animation: 'fadeIn 0.5s ease' }}>
      <h1 style={{ fontSize: '2.5rem', marginBottom: '2rem' }}>All Recipes</h1>
      
      <div className="glass-panel" style={{ padding: '1.5rem', marginBottom: '2rem', display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center' }}>
        <div style={{ flex: '1 1 250px', position: 'relative' }}>
          <Search size={18} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
          <input 
            type="text" 
            placeholder="Search recipes..." 
            value={search} 
            onChange={e => setSearch(e.target.value)}
            style={{ width: '100%', paddingLeft: '2.5rem' }} 
          />
        </div>
        
        <select value={cuisineFilter} onChange={e => setCuisineFilter(e.target.value)} style={{ flex: '1 1 150px' }}>
          {cuisines.map(c => <option key={c} value={c}>{c} Cuisine</option>)}
        </select>

        <select value={difficultyFilter} onChange={e => setDifficultyFilter(e.target.value)} style={{ flex: '1 1 150px' }}>
          <option value="All">All Difficulties</option>
          <option value="Easy">Easy</option>
          <option value="Medium">Medium</option>
          <option value="Hard">Hard</option>
        </select>

        <select value={sortBy} onChange={e => setSortBy(e.target.value)} style={{ flex: '1 1 150px' }}>
          <option value="name">Sort by Name</option>
          <option value="rating">Sort by Rating</option>
          <option value="prepTime">Sort by Prep Time</option>
        </select>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2rem' }}>
        {filteredRecipes.length > 0 ? filteredRecipes.map(recipe => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        )) : (
          <p style={{ color: 'var(--text-secondary)' }}>No recipes found matching your criteria.</p>
        )}
      </div>
    </div>
  );
}
