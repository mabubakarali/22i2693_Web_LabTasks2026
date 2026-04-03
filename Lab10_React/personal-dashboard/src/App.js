import React, { useState, useEffect } from 'react';
import TaskInput from './TaskInput';
import FilterControls from './FilterControls';
import TaskList from './TaskList';

// Pre-defined tasks
const initialTasks = [
  { id: 1, text: "Read React documentation", isCompleted: false },
  { id: 2, text: "Build a small project", isCompleted: true },
  { id: 3, text: "Write lab report", isCompleted: false }
];

export default function App() {
  // State management
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  // Simulate loading data from an API
  useEffect(() => {
    const timer = setTimeout(() => {
      setTasks(initialTasks);
      setIsLoading(false);
    }, 1000); 

    return () => clearTimeout(timer);
  }, []);

  // Event Handlers
  const handleAddTask = (text) => {
    const newTask = {
      id: Date.now(), 
      text: text,
      isCompleted: false
    };
    setTasks([...tasks, newTask]);
  };

  const handleToggleTask = (id) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, isCompleted: !task.isCompleted } : task
    ));
  };

  const handleDeleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  // Filter Logic
  const filteredTasks = tasks.filter(task => {
    if (filter === 'active') return !task.isCompleted;
    if (filter === 'completed') return task.isCompleted;
    return true; // 'all'
  });

  return (
    <div style={{ maxWidth: '500px', margin: '40px auto', fontFamily: 'sans-serif', padding: '20px', boxShadow: '0 0 10px rgba(0,0,0,0.1)', borderRadius: '8px' }}>
      <h2>Personal Task Manager</h2>
      
      <TaskInput onAddTask={handleAddTask} />
      
      <FilterControls currentFilter={filter} onFilterChange={setFilter} />

      {isLoading ? (
        <p style={{ color: '#007bff', fontWeight: 'bold' }}>Loading tasks...</p>
      ) : (
        <TaskList 
          tasks={filteredTasks} 
          onToggleTask={handleToggleTask} 
          onDeleteTask={handleDeleteTask} 
        />
      )}
    </div>
  );
}