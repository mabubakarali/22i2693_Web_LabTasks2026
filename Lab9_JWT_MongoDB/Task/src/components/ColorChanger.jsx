import React, { useState } from 'react';

export default function ColorChanger() {
    const [reactColor, setReactColor] = useState('lightblue');
    const [reactInput, setReactInput] = useState('');

    const handleHtmlColorChange = () => {
        const div = document.getElementById('htmlColorBox');
        const input = document.getElementById('htmlColorInput');
        div.style.backgroundColor = input.value;
        input.value = ''; 
    };
    const handleReactColorChange = () => {
        setReactColor(reactInput);
        setReactInput(''); 
    };
    return (
        <div style={{ padding: '10px', display: 'flex', gap: '40px', flexDirection: 'column' }}>
            <div>
                <h3>1. HTML DOM Approach</h3>
                <div id="htmlColorBox" style={{ width: '150px', height: '150px', backgroundColor: 'lightgray', marginBottom: '10px', border: '1px solid black' }}></div>
                <input id="htmlColorInput" type="text" placeholder="Enter color (e.g., red)" style={{ marginRight: '10px', padding: '5px' }} />
                <button onClick={handleHtmlColorChange} style={{ padding: '5px 10px' }}>Change Color (HTML DOM)</button>
            </div>
            <div>
                <h3>2. React DOM Approach</h3>
                <div style={{ width: '150px', height: '150px', backgroundColor: reactColor, marginBottom: '10px', border: '1px solid black' }}></div>
                <input 
                    type="text" 
                    value={reactInput}
                    onChange={(e) => setReactInput(e.target.value)}
                    placeholder="Enter color (e.g., red)" 
                    style={{ marginRight: '10px', padding: '5px' }}
                />
                <button onClick={handleReactColorChange} style={{ padding: '5px 10px' }}>Change Color (React DOM)</button>
            </div>
            <div style={{ marginTop: '20px' }}>
                <h3>Comparison: HTML DOM vs React DOM</h3>
                <table border="1" cellPadding="10" style={{ borderCollapse: 'collapse', width: '100%' }}>
                    <thead>
                        <tr style={{ backgroundColor: '#f2f2f2' }}>
                            <th style={{ textAlign: 'left' }}>Aspect</th>
                            <th style={{ textAlign: 'left' }}>HTML DOM Approach</th>
                            <th style={{ textAlign: 'left' }}>React DOM Approach</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><strong>How does it update the UI?</strong></td>
                            <td>Imperatively: Directly accesses element ID to change style.</td>
                            <td>Declaratively: Updates a state variable; React handles the rest.</td>
                        </tr>
                        <tr>
                            <td><strong>Does it touch the DOM directly?</strong></td>
                            <td>Yes, mutates the actual browser DOM.</td>
                            <td>No, it updates the Virtual DOM first, then syncs.</td>
                        </tr>
                        <tr>
                            <td><strong>What happens on re-render?</strong></td>
                            <td>Direct mutations are lost if React re-renders the component.</td>
                            <td>Changes persist because they are tied to React's state lifecycle.</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}