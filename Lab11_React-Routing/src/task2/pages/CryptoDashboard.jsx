import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { TrendingUp, TrendingDown, Star, Loader2, Search } from 'lucide-react';

export default function CryptoDashboard() {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');
  
  // Settings
  const settings = JSON.parse(localStorage.getItem('lab13_crypto_settings') || '{"currency":"usd","favorites":[]}');
  const currencySymbol = settings.currency.toUpperCase();

  const fetchCoins = async () => {
    try {
      // Free public API requires no key
      const res = await fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${settings.currency}&order=market_cap_desc&per_page=15&page=1&sparkline=false`);
      if (!res.ok) throw new Error('Failed to fetch data (Rate limit or network error)');
      const data = await res.json();
      setCoins(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCoins();
    const interval = setInterval(fetchCoins, 60000); // 60s auto refresh
    return () => clearInterval(interval);
  }, [settings.currency]); // Re-fetch if currency changes

  const filteredCoins = coins.filter(c => 
    c.name.toLowerCase().includes(search.toLowerCase()) || 
    c.symbol.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ animation: 'fadeIn 0.5s ease' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2.5rem' }}>Market Overview <span style={{ fontSize: '1.2rem', color: 'var(--text-secondary)' }}>Live</span></h1>
        
        <div style={{ position: 'relative', width: '300px' }}>
          <Search size={18} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
          <input 
            type="text" placeholder="Search coins..." 
            value={search} onChange={e => setSearch(e.target.value)}
            style={{ width: '100%', paddingLeft: '2.5rem' }} 
          />
        </div>
      </div>

      {error && <div style={{ background: 'rgba(239, 68, 68, 0.1)', color: 'var(--danger)', padding: '1rem', borderRadius: '8px', marginBottom: '2rem' }}>{error}</div>}

      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '40vh' }}>
          <Loader2 size={48} color="var(--task2-color)" className="spin" style={{ animation: 'spin 1s linear infinite' }} />
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
          {filteredCoins.map(coin => {
            const isFav = settings.favorites.includes(coin.id);
            const isPositive = coin.price_change_percentage_24h >= 0;
            return (
              <Link to={`/task2/coin/${coin.id}`} key={coin.id} className="glass-panel" style={{ 
                padding: '1.5rem', display: 'flex', flexDirection: 'column', textDecoration: 'none', transition: 'all 0.2s', cursor: 'pointer' 
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
                
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <img src={coin.image} alt={coin.name} style={{ width: '32px', height: '32px' }} />
                    <div>
                      <h3 style={{ margin: 0, color: 'var(--text-primary)' }}>{coin.name}</h3>
                      <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', textTransform: 'uppercase' }}>{coin.symbol}</span>
                    </div>
                  </div>
                  {isFav && <Star size={18} fill="var(--task2-color)" color="var(--task2-color)" />}
                </div>
                
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: 'auto' }}>
                  <div>
                    <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{currencySymbol} {coin.current_price.toLocaleString()}</div>
                    <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Vol: {currencySymbol} {(coin.total_volume / 1000000).toFixed(1)}M</div>
                  </div>
                  <div style={{ 
                    display: 'flex', alignItems: 'center', gap: '4px',
                    color: isPositive ? 'var(--success)' : 'var(--danger)',
                    fontWeight: 'bold', fontSize: '0.9rem',
                    background: isPositive ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                    padding: '4px 8px', borderRadius: '4px'
                  }}>
                    {isPositive ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                    {Math.abs(coin.price_change_percentage_24h).toFixed(2)}%
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      )}
    </div>
  );
}
