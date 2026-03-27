require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const jwt = require('jsonwebtoken'); // Added for the admin route

const authRoutes = require('./routes/auth');
const libraryRoutes = require('./routes/library');

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Database Connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB Connected Successfully'))
    .catch(err => console.error('MongoDB Connection Error:', err));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api', libraryRoutes);

// Task 3: Admin Route (Moved here to match the exact lab URL)
app.get('/api/content/admin', (req, res) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ message: "No token provided" });

    const token = authHeader.split(' ')[1];
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'supersecretkey');
        if (decoded.role !== 'admin') {
            return res.status(403).json({ message: "Access forbidden: Admins only" });
        }
        res.json({ message: "Welcome to the content management panel!" });
    } catch (err) {
        res.status(401).json({ message: "Invalid token" });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));