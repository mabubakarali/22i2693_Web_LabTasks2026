import React from 'react';
import DynamicList from './components/DynamicList';
import ColorChanger from './components/ColorChanger';

function App() {
  return (
    <div style={{ fontFamily: 'Arial, sans-serif', padding: '20px' }}>
      <h1>Lab 9: React DOM vs HTML DOM</h1>
      <hr />
      
      <section style={{ marginBottom: '50px' }}>
        <h2>Task 5 Output</h2>
        <div style={{ border: '2px dashed #ccc', padding: '20px' }}>
          <DynamicList />
        </div>
      </section>

      <hr />

      <section>
        <h2>Task 6 Output</h2>
        <div style={{ border: '2px dashed #ccc', padding: '20px' }}>
          <ColorChanger />
        </div>
      </section>
    </div>
  );
}

export default App;