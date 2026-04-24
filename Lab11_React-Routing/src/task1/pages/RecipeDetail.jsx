import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { recipesData } from '../data';
import { Clock, Star, MapPin, ChefHat, Check, Plus, MessageSquare } from 'lucide-react';

export default function RecipeDetail() {
  const { id } = useParams();
  const recipe = recipesData.find(r => r.id === parseInt(id));
  
  const [reviews, setReviews] = useState(recipe ? recipe.reviews : []);
  const [newReview, setNewReview] = useState('');
  const [newRating, setNewRating] = useState('5');
  const [inMealPlan, setInMealPlan] = useState(false);

  useEffect(() => {
    if (!recipe) return;
    
    // Check if in meal plan
    const mealPlan = JSON.parse(localStorage.getItem('lab13_mealplan') || '[]');
    setInMealPlan(mealPlan.includes(recipe.id));

    // Load local reviews
    const localReviews = JSON.parse(localStorage.getItem(`lab13_reviews_${recipe.id}`) || 'null');
    if (localReviews) {
      setReviews(localReviews);
    }
  }, [recipe]);

  if (!recipe) return <h2>Recipe not found.</h2>;

  const toggleMealPlan = () => {
    let mealPlan = JSON.parse(localStorage.getItem('lab13_mealplan') || '[]');
    if (inMealPlan) {
      mealPlan = mealPlan.filter(itemId => itemId !== recipe.id);
    } else {
      mealPlan.push(recipe.id);
    }
    localStorage.setItem('lab13_mealplan', JSON.stringify(mealPlan));
    setInMealPlan(!inMealPlan);
  };

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (!newReview.trim()) return;
    
    const submittedReview = {
      id: Date.now(),
      user: "Guest User",
      comment: newReview,
      rating: parseFloat(newRating)
    };
    
    const updatedReviews = [...reviews, submittedReview];
    setReviews(updatedReviews);
    localStorage.setItem(`lab13_reviews_${recipe.id}`, JSON.stringify(updatedReviews));
    setNewReview('');
  };

  return (
    <div style={{ animation: 'fadeIn 0.5s ease', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <Link to="/task1/recipes" style={{ color: 'var(--accent-color)' }}>&larr; Back to Recipes</Link>
      
      <div className="glass-panel" style={{ overflow: 'hidden' }}>
        <div style={{ height: '300px', width: '100%', position: 'relative' }}>
          <img src={recipe.image} alt={recipe.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, var(--surface-color), transparent)' }}></div>
          <h1 style={{ position: 'absolute', bottom: '20px', left: '30px', fontSize: '3rem', margin: 0 }}>{recipe.name}</h1>
        </div>
        
        <div style={{ padding: '2rem', display: 'flex', flexWrap: 'wrap', gap: '2rem' }}>
          <div style={{ flex: '1 1 600px' }}>
            <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '2rem', color: 'var(--text-secondary)' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Clock /> {recipe.prepTime} mins</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><MapPin /> {recipe.cuisine}</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--task2-color)' }}><Star /> {recipe.rating}</span>
            </div>

            <p style={{ fontSize: '1.1rem', marginBottom: '2rem', color: 'var(--text-primary)' }}>{recipe.description}</p>
            
            <button 
              onClick={toggleMealPlan}
              style={{
                background: inMealPlan ? 'rgba(16, 185, 129, 0.2)' : 'var(--task1-color)',
                color: inMealPlan ? 'var(--task1-color)' : '#fff',
                padding: '0.8rem 1.5rem', borderRadius: '8px', fontWeight: 'bold',
                display: 'flex', alignItems: 'center', gap: '8px', border: inMealPlan ? '1px solid var(--task1-color)' : 'none'
              }}
            >
              {inMealPlan ? <><Check size={20}/> Saved to Meal Plan</> : <><Plus size={20}/> Add to Meal Plan</>}
            </button>
          </div>

          <div style={{ flex: '1 1 300px', background: 'var(--surface-lighter)', padding: '1.5rem', borderRadius: '12px' }}>
            <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '1rem' }}><ChefHat/> Ingredients</h3>
            <ul style={{ paddingLeft: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', color: 'var(--text-secondary)' }}>
              {recipe.ingredients.map((ing, i) => <li key={i}>{ing}</li>)}
            </ul>
          </div>
        </div>
        
        <div style={{ padding: '0 2rem 2rem 2rem' }}>
          <h3 style={{ marginBottom: '1rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>Instructions</h3>
          <ol style={{ paddingLeft: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem', color: 'var(--text-secondary)' }}>
            {recipe.instructions.map((inst, i) => (
              <li key={i} style={{ paddingLeft: '1rem' }}>
                <span style={{ color: 'var(--text-primary)' }}>{inst}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>

      <div className="glass-panel" style={{ padding: '2rem' }}>
        <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '1.5rem' }}><MessageSquare/> Reviews</h3>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
          {reviews.length === 0 ? <p style={{ color: 'var(--text-secondary)' }}>No reviews yet.</p> : reviews.map((r, i) => (
            <div key={i} style={{ background: 'var(--surface-lighter)', padding: '1rem', borderRadius: '8px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <strong>{r.user}</strong>
                <span style={{ color: 'var(--task2-color)', display: 'flex', alignItems: 'center', gap: '4px' }}><Star size={14}/> {r.rating}</span>
              </div>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{r.comment}</p>
            </div>
          ))}
        </div>

        <form onSubmit={handleReviewSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <h4>Add a Review</h4>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <select value={newRating} onChange={e => setNewRating(e.target.value)} style={{ width: '100px' }}>
              <option value="5">5 Stars</option>
              <option value="4">4 Stars</option>
              <option value="3">3 Stars</option>
              <option value="2">2 Stars</option>
              <option value="1">1 Star</option>
            </select>
            <input 
              type="text" 
              placeholder="Write your comment..." 
              value={newReview} 
              onChange={e => setNewReview(e.target.value)} 
              style={{ flex: 1 }}
            />
            <button type="submit" style={{ background: 'var(--accent-color)', color: 'white', padding: '0 1.5rem', borderRadius: '8px', fontWeight: 'bold' }}>Submit</button>
          </div>
        </form>
      </div>

    </div>
  );
}
