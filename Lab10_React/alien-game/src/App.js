import React, { useState, useEffect } from 'react';

// --- 1. CARD COMPONENT ---
const Card = ({ signal, isFlipped, isMatched, onClick }) => {
  // Dynamic styling based on card state
  const baseStyle = {
    width: '80px',
    height: '80px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '2rem',
    borderRadius: '8px',
    cursor: isFlipped || isMatched ? 'default' : 'pointer',
    userSelect: 'none',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
    transition: 'background-color 0.3s',
  };

  const getStyle = () => {
    if (isMatched) return { ...baseStyle, backgroundColor: '#4ade80', color: 'white' }; // Highlighted match
    if (isFlipped) return { ...baseStyle, backgroundColor: '#60a5fa', color: 'white' }; // Flipped
    return { ...baseStyle, backgroundColor: '#cbd5e1', color: 'transparent' };          // Hidden
  };

  return (
    <div style={getStyle()} onClick={onClick}>
      {(isFlipped || isMatched) ? signal : '?'}
    </div>
  );
};

// --- 2. MAIN COMPONENT ---
const AlienSignalDecryption = () => {
  // Base signals to duplicate
  const ALIEN_SYMBOLS = ['⚛️', '🌌', '👽', '🛸', '☄️', '🚀', '🔭', '📡'];

  // Required State Hooks
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);
  const [score, setScore] = useState(0);
  const [time, setTime] = useState(0);
  
  // Extra state for timer control and final game state
  const [timerActive, setTimerActive] = useState(false);
  const [gameOver, setGameOver] = useState(false);

  // Initialize and shuffle cards on mount
  useEffect(() => {
    initializeGame();
  }, []);

  const initializeGame = () => {
    // Array manipulation: Duplicate and shuffle
    const pairedSignals = [...ALIEN_SYMBOLS, ...ALIEN_SYMBOLS];
    const shuffled = pairedSignals
      .map((signal, index) => ({ id: index, signal }))
      .sort(() => Math.random() - 0.5); // Random shuffle
    
    setCards(shuffled);
    setFlippedCards([]);
    setMatchedCards([]);
    setScore(0);
    setTime(0);
    setTimerActive(false);
    setGameOver(false);
  };

  // Timer Logic
  useEffect(() => {
    let interval = null;
    if (timerActive) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    }
    return () => clearInterval(interval); // Cleanup interval on unmount or state change
  }, [timerActive]);

  // Game Logic: Checking matches and delays
  useEffect(() => {
    if (flippedCards.length === 2) {
      const [firstIndex, secondIndex] = flippedCards;
      const firstCard = cards[firstIndex];
      const secondCard = cards[secondIndex];

      if (firstCard.signal === secondCard.signal) {
        // MATCH: Keep visible permanently
        setMatchedCards((prev) => [...prev, firstIndex, secondIndex]);
        setScore((prev) => prev + 100);
        setFlippedCards([]);
      } else {
        // MISMATCH: Hide after 1 second
        setScore((prev) => prev - 10);
        const timeoutId = setTimeout(() => {
          setFlippedCards([]);
        }, 1000);
        
        return () => clearTimeout(timeoutId); // Cleanup timeout
      }
    }
  }, [flippedCards, cards]);

  // Check Win Condition
  useEffect(() => {
    if (matchedCards.length === 16 && cards.length > 0) {
      setTimerActive(false);
      setGameOver(true);
      
      // Calculate time bonus (e.g., max 300 points, losing 5 points per second)
      const timeBonus = Math.max(0, 300 - (time * 5));
      setScore((prev) => prev + timeBonus);
    }
  }, [matchedCards, cards, time]);

  // Click Handler
  const handleCardClick = (index) => {
    // Start timer on first click
    if (!timerActive && !gameOver && matchedCards.length === 0) {
      setTimerActive(true);
    }

    // Prevent clicking if: 2 cards are already flipped, card is already matched, or card is already flipped
    if (
      flippedCards.length === 2 ||
      matchedCards.includes(index) ||
      flippedCards.includes(index) ||
      gameOver
    ) {
      return;
    }

    setFlippedCards((prev) => [...prev, index]);
  };

  // UI Styling
  const containerStyle = {
    fontFamily: 'Arial, sans-serif',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px'
  };

  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)', // 4x4 Grid
    gap: '10px',
    margin: '20px 0'
  };

  return (
    <div style={containerStyle}>
      <h2>Alien Signal Decryption Lab</h2>
      
      <div style={{ display: 'flex', gap: '20px', fontSize: '1.2rem', fontWeight: 'bold' }}>
        <p>Score: {score}</p>
        <p>Time: {time}s</p>
      </div>

      <div style={gridStyle}>
        {cards.map((card, index) => (
          <Card
            key={card.id}
            signal={card.signal}
            isFlipped={flippedCards.includes(index)}
            isMatched={matchedCards.includes(index)}
            onClick={() => handleCardClick(index)}
          />
        ))}
      </div>

      {gameOver && (
        <div style={{ textAlign: 'center', marginTop: '10px' }}>
          <h3 style={{ color: 'green' }}>Decryption Complete!</h3>
          <p>Final Score (with Time Bonus): {score}</p>
          <button 
            onClick={initializeGame}
            style={{ padding: '10px 20px', fontSize: '1rem', cursor: 'pointer' }}
          >
            Restart Sequence
          </button>
        </div>
      )}
    </div>
  );
};

export default AlienSignalDecryption;