import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import RecipeHome from './pages/RecipeHome';
import RecipeList from './pages/RecipeList';
import RecipeDetail from './pages/RecipeDetail';
import MealPlan from './pages/MealPlan';

export default function Task1App() {
  return (
    <div style={{ backgroundColor: 'var(--bg-color)', minHeight: '100vh', color: 'var(--text-primary)' }}>
      <Navbar />
      <main style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
        <Routes>
          <Route path="/" element={<RecipeHome />} />
          <Route path="/recipes" element={<RecipeList />} />
          <Route path="/recipes/:id" element={<RecipeDetail />} />
          <Route path="/meal-plan" element={<MealPlan />} />
        </Routes>
      </main>
    </div>
  );
}
