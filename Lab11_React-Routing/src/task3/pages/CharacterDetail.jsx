import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Loader2, ArrowLeft, Heart, Activity, Skull, HelpCircle, MapPin, Film } from 'lucide-react';

export default function CharacterDetail() {
  const { id } = useParams();
  const [character, setCharacter] = useState(null);
  const [loading, setLoading] = useState(true);
  
  const [favs, setFavs] = useState(() => JSON.parse(localStorage.getItem('lab13_rm_favs') || '[]'));
  const isFav = favs.includes(parseInt(id));

  useEffect(() => {
    fetch(`https://rickandmortyapi.com/api/character/${id}`)
      .then(res => res.json())
      .then(data => {
        setCharacter(data);
        setLoading(false);
      });
  }, [id]);

  const toggleFav = () => {
    let newFavs;
    if (isFav) {
      newFavs = favs.filter(fId => fId !== parseInt(id));
    } else {
      newFavs = [...favs, parseInt(id)];
    }
    setFavs(newFavs);
    localStorage.setItem('lab13_rm_favs', JSON.stringify(newFavs));
  };

  const StatusIcon = ({ status }) => {
    if (status === 'Alive') return <Activity size={20} color="var(--success)" />;
    if (status === 'Dead') return <Skull size={20} color="var(--danger)" />;
    return <HelpCircle size={20} color="var(--text-secondary)" />;
  };

  if (loading) return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}><Loader2 size={48} color="var(--task3-color)" className="spin" /></div>;
  if (!character) return <div>Character not found.</div>;

  return (
    <div style={{ animation: 'fadeIn 0.5s ease', maxWidth: '900px', margin: '0 auto' }}>
      <Link to="/task3" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--task3-color)', marginBottom: '2rem', textDecoration: 'none' }}>
        <ArrowLeft size={18} /> Back to Roster
      </Link>
      
      <div className="glass-panel" style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', overflow: 'hidden' }}>
        <div style={{ flex: '1 1 400px' }}>
          <img src={character.image} alt={character.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
        
        <div style={{ flex: '1 1 400px', padding: '3rem', display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
            <h1 style={{ fontSize: '3rem', margin: 0, lineHeight: '1.2' }}>{character.name}</h1>
            <button onClick={toggleFav} style={{ background: 'var(--surface-lighter)', padding: '12px', borderRadius: '50%', display: 'flex', transition: 'all 0.2s' }}>
              <Heart size={24} fill={isFav ? "var(--danger)" : "transparent"} color={isFav ? "var(--danger)" : "var(--text-primary)"} />
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', fontSize: '1.1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <StatusIcon status={character.status} />
              <span style={{ fontWeight: 'bold' }}>{character.status} - {character.species}</span>
              {character.type && <span style={{ color: 'var(--text-secondary)' }}>({character.type})</span>}
            </div>
            
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', color: 'var(--text-secondary)' }}>
              <MapPin size={20} color="var(--task3-color)" />
              <div>
                <span style={{ display: 'block', fontSize: '0.9rem', marginBottom: '4px' }}>Last known location:</span>
                <span style={{ color: 'var(--text-primary)' }}>{character.location.name}</span>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', color: 'var(--text-secondary)' }}>
              <MapPin size={20} color="var(--task1-color)" />
              <div>
                <span style={{ display: 'block', fontSize: '0.9rem', marginBottom: '4px' }}>Origin:</span>
                <span style={{ color: 'var(--text-primary)' }}>{character.origin.name}</span>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', color: 'var(--text-secondary)' }}>
              <Film size={20} color="var(--task2-color)" />
              <div>
                <span style={{ display: 'block', fontSize: '0.9rem', marginBottom: '4px' }}>Episodes featured in:</span>
                <span style={{ color: 'var(--text-primary)' }}>{character.episode.length} episodes</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
