import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import CryptoDashboard from './pages/CryptoDashboard';
import CoinDetail from './pages/CoinDetail';
import Settings from './pages/Settings';

export default function Task2App() {
  return (
    <div style={{ backgroundColor: 'var(--bg-color)', minHeight: '100vh', color: 'var(--text-primary)' }}>
      <Navbar />
      <main style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
        <Routes>
          <Route path="/" element={<CryptoDashboard />} />
          <Route path="/coin/:id" element={<CoinDetail />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </main>
    </div>
  );
}
