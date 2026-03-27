const express = require('express');
const app = express();
const students = [
    { id: 1, name: "Ali", semester: 5 },
    { id: 2, name: "Sara", semester: 3 },
    { id: 3, name: "Ahmed", semester: 5 }
];
app.get('/students', (req, res) => {
    const searchQuery = req.query.name;
    if (searchQuery) {
        const filtered = students.filter(s => s.name.toLowerCase() === searchQuery.toLowerCase());
        if (filtered.length === 0) {
            return res.send("No student found");
        }
        return res.json(filtered);
    } 
    res.json(students);
});
app.listen(3001, () => {
    console.log('Task 7 Server running on http://localhost:3001');
});