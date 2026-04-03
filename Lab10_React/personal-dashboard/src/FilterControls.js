import React from 'react';

function FilterControls({ currentFilter, onFilterChange }) {
  const filters = ['all', 'active', 'completed'];

  return (
    <div style={{ marginBottom: '20px', display: 'flex', gap: '10px' }}>
      {filters.map(filterType => {
        const isActive = currentFilter === filterType;
        return (
          <button
            key={filterType}
            onClick={() => onFilterChange(filterType)}
            style={{
              padding: '8px 16px',
              border: '1px solid #007bff',
              borderRadius: '4px',
              cursor: 'pointer',
              textTransform: 'capitalize',
              backgroundColor: isActive ? '#007bff' : 'white',
              color: isActive ? 'white' : '#007bff',
              fontWeight: isActive ? 'bold' : 'normal'
            }}
          >
            {filterType}
          </button>
        );
      })}
    </div>
  );
}

export default FilterControls;