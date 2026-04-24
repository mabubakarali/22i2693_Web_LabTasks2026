import React, { useState, useEffect } from 'react';

export default function Settings() {
  const defaultSettings = { currency: 'usd', favorites: [] };
  const [settings, setSettings] = useState(() => {
    return JSON.parse(localStorage.getItem('lab13_crypto_settings') || JSON.stringify(defaultSettings));
  });
  const [savedMsg, setSavedMsg] = useState(false);

  const saveSettings = () => {
    localStorage.setItem('lab13_crypto_settings', JSON.stringify(settings));
    setSavedMsg(true);
    setTimeout(() => setSavedMsg(false), 3000);
  };

  const handleCurrencyChange = (e) => {
    setSettings(prev => ({ ...prev, currency: e.target.value }));
  };

  const clearFavs = () => {
    setSettings(prev => ({ ...prev, favorites: [] }));
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', animation: 'fadeIn 0.5s ease' }}>
      <h1 style={{ marginBottom: '2rem' }}>Settings</h1>
      
      <div className="glass-panel" style={{ padding: '2rem' }}>
        <h3 style={{ marginBottom: '1.5rem', color: 'var(--text-secondary)' }}>Preferences</h3>
        
        <div style={{ marginBottom: '2rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Currency</label>
          <select value={settings.currency} onChange={handleCurrencyChange} style={{ width: '100%', padding: '1rem', background: 'var(--surface-color)' }}>
            <option value="usd">USD - US Dollar</option>
            <option value="eur">EUR - Euro</option>
            <option value="gbp">GBP - British Pound</option>
            <option value="inr">INR - Indian Rupee</option>
          </select>
        </div>

        <div style={{ marginBottom: '2rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Favorites</label>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1rem' }}>
            You have {settings.favorites.length} favorite coins.
          </p>
          {settings.favorites.length > 0 && (
            <button onClick={clearFavs} style={{ color: 'var(--danger)', fontSize: '0.9rem', textDecoration: 'underline' }}>Clear Favorites</button>
          )}
        </div>
        
        <button onClick={saveSettings} style={{ 
          background: 'var(--task2-color)', color: '#000', 
          padding: '1rem', width: '100%', borderRadius: '8px', 
          fontWeight: 'bold', fontSize: '1.1rem' 
        }}>
          Save Preferences
        </button>

        {savedMsg && <div style={{ marginTop: '1rem', color: 'var(--success)', textAlign: 'center', fontWeight: 'bold' }}>Preferences Saved!</div>}
      </div>
    </div>
  );
}
