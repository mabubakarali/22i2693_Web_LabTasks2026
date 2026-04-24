import React from 'react';
import { Link } from 'react-router-dom';
import { ChefHat, TrendingUp, Gamepad2, ArrowRight } from 'lucide-react';

export default function Hub() {
  return (
    <div className="hub-container" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
      <div style={{ textAlign: 'center', marginBottom: '4rem', animation: 'fadeIn 1s ease-out' }}>
        <h1 style={{ fontSize: '3.5rem', marginBottom: '1rem', background: 'var(--accent-gradient)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          Web Engineering Lab 13
        </h1>
        <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto' }}>
          Explore three distinct React applications demonstrating advanced state management, local storage, API integration, and routing.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', width: '100%', maxWidth: '1100px' }}>
        
        <Link to="/task1" className="glass-panel" style={{ padding: '2.5rem', display: 'flex', flexDirection: 'column', transition: 'all 0.3s ease', cursor: 'pointer', textDecoration: 'none' }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-10px)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
          <div style={{ background: 'rgba(16, 185, 129, 0.1)', padding: '1rem', borderRadius: '12px', width: 'fit-content', marginBottom: '1.5rem' }}>
            <ChefHat size={32} color="var(--task1-color)" />
          </div>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>Recipe Book</h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem', flex: 1 }}>
            Local data management with comprehensive filtering, favorites, and meal plan scheduling.
          </p>
          <div style={{ display: 'flex', alignItems: 'center', color: 'var(--task1-color)', fontWeight: '600' }}>
            Explore App <ArrowRight size={18} style={{ marginLeft: '0.5rem' }} />
          </div>
        </Link>

        <Link to="/task2" className="glass-panel" style={{ padding: '2.5rem', display: 'flex', flexDirection: 'column', transition: 'all 0.3s ease', cursor: 'pointer', textDecoration: 'none' }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-10px)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
          <div style={{ background: 'rgba(245, 158, 11, 0.1)', padding: '1rem', borderRadius: '12px', width: 'fit-content', marginBottom: '1.5rem' }}>
            <TrendingUp size={32} color="var(--task2-color)" />
          </div>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>Crypto Tracker</h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem', flex: 1 }}>
            Live cryptocurrency dashboard pulling data from CoinGecko API with historical charts and auto-refresh.
          </p>
          <div style={{ display: 'flex', alignItems: 'center', color: 'var(--task2-color)', fontWeight: '600' }}>
            Explore App <ArrowRight size={18} style={{ marginLeft: '0.5rem' }} />
          </div>
        </Link>

        <Link to="/task3" className="glass-panel" style={{ padding: '2.5rem', display: 'flex', flexDirection: 'column', transition: 'all 0.3s ease', cursor: 'pointer', textDecoration: 'none' }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-10px)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
          <div style={{ background: 'rgba(139, 92, 246, 0.1)', padding: '1rem', borderRadius: '12px', width: 'fit-content', marginBottom: '1.5rem' }}>
            <Gamepad2 size={32} color="var(--task3-color)" />
          </div>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>Character Explorer</h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem', flex: 1 }}>
            Rick and Morty API integration with pagination, complex filtering, and detailed character cards.
          </p>
          <div style={{ display: 'flex', alignItems: 'center', color: 'var(--task3-color)', fontWeight: '600' }}>
            Explore App <ArrowRight size={18} style={{ marginLeft: '0.5rem' }} />
          </div>
        </Link>

      </div>
    </div>
  );
}
