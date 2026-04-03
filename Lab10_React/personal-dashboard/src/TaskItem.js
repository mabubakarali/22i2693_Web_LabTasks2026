import React from 'react';

function TaskItem({ task, onToggle, onDelete }) {
  return (
    <li style={{ display: 'flex', alignItems: 'center', marginBottom: '10px', paddingBottom: '10px', borderBottom: '1px solid #eee' }}>
      <input
        type="checkbox"
        checked={task.isCompleted}
        onChange={() => onToggle(task.id)}
        style={{ marginRight: '10px', cursor: 'pointer' }}
      />
      <span style={{ 
        flexGrow: 1, 
        textDecoration: task.isCompleted ? 'line-through' : 'none',
        color: task.isCompleted ? '#888' : '#000'
      }}>
        {task.text}
      </span>
      <button 
        onClick={() => onDelete(task.id)}
        style={{ padding: '5px 10px', backgroundColor: '#ff4d4f', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
      >
        Delete
      </button>
    </li>
  );
}

export default TaskItem;