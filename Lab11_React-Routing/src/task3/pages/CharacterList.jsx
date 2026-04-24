import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, Loader2, Heart, Skull, Activity, HelpCircle } from 'lucide-react';

export default function CharacterList() {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Pagination
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Filters
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [speciesFilter, setSpeciesFilter] = useState('');

  // Favorites from localstorage
  const favs = JSON.parse(localStorage.getItem('lab13_rm_favs') || '[]');

  // Separate useEffect for Debouncing Search
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
      setPage(1); // Reset page on new search
    }, 500);
    return () => clearTimeout(timer);
  }, [search]);

  // Separate useEffect for Data Fetching based on filters and page
  useEffect(() => {
    const fetchCharacters = async () => {
      setLoading(true);
      try {
        let url = `https://rickandmortyapi.com/api/character/?page=${page}`;
        if (debouncedSearch) url += `&name=${debouncedSearch}`;
        if (statusFilter) url += `&status=${statusFilter}`;
        if (speciesFilter) url += `&species=${speciesFilter}`;

        const res = await fetch(url);
        if (res.status === 404) {
          // API returns 404 if no characters match
          setCharacters([]);
          setTotalPages(1);
          return;
        }
        if (!res.ok) throw new Error("Network Error");
        
        const data = await res.json();
        setCharacters(data.results);
        setTotalPages(data.info.pages);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCharacters();
  }, [page, debouncedSearch, statusFilter, speciesFilter]);

  const StatusIcon = ({ status }) => {
    if (status === 'Alive') return <Activity size={16} color="var(--success)" />;
    if (status === 'Dead') return <Skull size={16} color="var(--danger)" />;
    return <HelpCircle size={16} color="var(--text-secondary)" />;
  };

  return (
    <div style={{ animation: 'fadeIn 0.5s ease' }}>
      <h1 style={{ fontSize: '2.5rem', marginBottom: '2rem' }}>Character Roster</h1>

      <div className="glass-panel" style={{ padding: '1.5rem', marginBottom: '2rem', display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center' }}>
        <div style={{ flex: '1 1 250px', position: 'relative' }}>
          <Search size={18} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
          <input 
            type="text" 
            placeholder="Search characters..." 
            value={search} 
            onChange={e => setSearch(e.target.value)}
            style={{ width: '100%', paddingLeft: '2.5rem' }} 
          />
        </div>
        
        <select value={statusFilter} onChange={e => { setStatusFilter(e.target.value); setPage(1); }} style={{ flex: '1 1 150px' }}>
          <option value="">All Statuses</option>
          <option value="alive">Alive</option>
          <option value="dead">Dead</option>
          <option value="unknown">Unknown</option>
        </select>

        <select value={speciesFilter} onChange={e => { setSpeciesFilter(e.target.value); setPage(1); }} style={{ flex: '1 1 150px' }}>
          <option value="">All Species</option>
          <option value="human">Human</option>
          <option value="alien">Alien</option>
          <option value="humanoid">Humanoid</option>
          <option value="robot">Robot</option>
        </select>
      </div>

      {error ? <div style={{ color: 'var(--danger)', textAlign: 'center' }}>{error}</div> : null}

      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '40vh' }}>
          <Loader2 size={48} color="var(--task3-color)" className="spin" style={{ animation: 'spin 1s linear infinite' }} />
        </div>
      ) : characters.length === 0 ? (
        <div style={{ textAlign: 'center', color: 'var(--text-secondary)', padding: '3rem' }}>No characters found matching your filters.</div>
      ) : (
        <>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '2rem' }}>
            {characters.map(char => {
              const isFav = favs.includes(char.id);
              return (
                <Link to={`/task3/character/${char.id}`} key={char.id} className="glass-panel" style={{ 
                  overflow: 'hidden', textDecoration: 'none', transition: 'all 0.3s ease', cursor: 'pointer', position: 'relative'
                }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
                  <img src={char.image} alt={char.name} style={{ width: '100%', height: '280px', objectFit: 'cover' }} />
                  {isFav && <Heart size={24} fill="var(--danger)" color="var(--danger)" style={{ position: 'absolute', top: '15px', right: '15px', dropShadow: '0 2px 4px rgba(0,0,0,0.5)' }} />}
                  <div style={{ padding: '1.5rem', background: 'var(--surface-color)' }}>
                    <h3 style={{ margin: '0 0 0.5rem 0', color: 'var(--text-primary)', fontSize: '1.25rem' }}>{char.name}</h3>
                    <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><StatusIcon status={char.status} /> {char.status}</span>
                      <span>{char.species}</span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '1.5rem', marginTop: '3rem' }}>
            <button 
              disabled={page === 1} 
              onClick={() => setPage(p => p - 1)}
              style={{ background: page === 1 ? 'var(--surface-lighter)' : 'var(--task3-color)', color: 'white', padding: '0.75rem 1.5rem', borderRadius: '8px', opacity: page === 1 ? 0.5 : 1 }}
            >
              Previous
            </button>
            <span style={{ fontWeight: 'bold' }}>Page {page} of {totalPages}</span>
            <button 
              disabled={page === totalPages || totalPages === 0} 
              onClick={() => setPage(p => p + 1)}
              style={{ background: page === totalPages || totalPages === 0 ? 'var(--surface-lighter)' : 'var(--task3-color)', color: 'white', padding: '0.75rem 1.5rem', borderRadius: '8px', opacity: page === totalPages || totalPages === 0 ? 0.5 : 1 }}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
}
