import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Hub from './pages/Hub';

// We will mount these dynamically once we create them
import Task1App from './task1/Task1App';
import Task2App from './task2/Task2App';
import Task3App from './task3/Task3App';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Hub />} />
        <Route path="/task1/*" element={<Task1App />} />
        <Route path="/task2/*" element={<Task2App />} />
        <Route path="/task3/*" element={<Task3App />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
