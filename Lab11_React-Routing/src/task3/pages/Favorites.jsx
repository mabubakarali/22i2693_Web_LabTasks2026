import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Loader2 } from 'lucide-react';

export default function Favorites() {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFavs = async () => {
      const favIds = JSON.parse(localStorage.getItem('lab13_rm_favs') || '[]');
      if (favIds.length === 0) {
        setLoading(false);
        return;
      }

      // The API supports passing multiple IDs: /api/character/1,2,3
      try {
        const res = await fetch(`https://rickandmortyapi.com/api/character/${favIds.join(',')}`);
        const data = await res.json();
        // If only 1 ID is requested, API returns an object instead of array
        setFavorites(Array.isArray(data) ? data : [data]);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchFavs();
  }, []);

  if (loading) return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}><Loader2 size={48} color="var(--task3-color)" className="spin" /></div>;

  return (
    <div style={{ animation: 'fadeIn 0.5s ease' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
        <Heart size={32} color="var(--danger)" fill="var(--danger)" />
        <h1 style={{ fontSize: '2.5rem', margin: 0 }}>Favorite Characters</h1>
      </div>

      {favorites.length === 0 ? (
        <div className="glass-panel" style={{ padding: '4rem', textAlign: 'center' }}>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', marginBottom: '1rem' }}>Your robustly curated team of multidimensional beings is empty.</p>
          <Link to="/task3" style={{ color: 'var(--task3-color)', fontWeight: 'bold' }}>Explore the roster</Link>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '2rem' }}>
          {favorites.map(char => (
            <Link to={`/task3/character/${char.id}`} key={char.id} className="glass-panel" style={{ overflow: 'hidden', textDecoration: 'none' }}>
              <img src={char.image} alt={char.name} style={{ width: '100%', height: '280px', objectFit: 'cover' }} />
              <div style={{ padding: '1.5rem', background: 'var(--surface-color)' }}>
                <h3 style={{ margin: '0 0 0.5rem 0', color: 'var(--text-primary)', fontSize: '1.25rem' }}>{char.name}</h3>
                <span style={{ color: 'var(--text-secondary)' }}>{char.species}</span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
