import React from 'react';

export default function DynamicList() {
    const handleAddItem = () => {
        const inputElement = document.getElementById('itemInput');
        const ulElement = document.getElementById('itemList');
        const value = inputElement.value;

        if (value.trim() !== "") {
            const li = document.createElement('li');
            li.textContent = value;
            li.style.border = "1px solid #ccc";
            li.style.margin = "5px 0";
            li.style.padding = "8px";
            li.style.borderRadius = "4px";
            
            ulElement.appendChild(li);
            inputElement.value = ''; 
        }
    };

    const handleRemoveLastItem = () => {
        const ulElement = document.getElementById('itemList');
        if (ulElement.lastChild) {
            ulElement.removeChild(ulElement.lastChild);
        }
    };

    return (
        <div style={{ padding: '10px' }}>
            <h3>My Favorite Items</h3>
            <input id="itemInput" type="text" placeholder="Type an item..." style={{ marginRight: '10px', padding: '5px' }} />
            <button onClick={handleAddItem} style={{ marginRight: '10px', padding: '5px 10px' }}>Add Item</button>
            <button onClick={handleRemoveLastItem} style={{ padding: '5px 10px' }}>Remove Last Item</button>
            <ul id="itemList" style={{ listStyleType: 'none', padding: 0, marginTop: '15px' }}></ul>
        </div>
    );
}