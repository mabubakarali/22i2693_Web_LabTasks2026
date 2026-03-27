const express = require('express');
const { Category, Book } = require('../models/Library');
const router = express.Router();

// Categories
router.post('/categories', async (req, res) => {
    const category = new Category(req.body);
    await category.save();
    res.status(201).json(category);
});

router.delete('/categories/:id', async (req, res) => {
    await Category.findByIdAndDelete(req.params.id);
    res.json({ message: "Category deleted" });
});

// Books
router.post('/books', async (req, res) => {
    const book = new Book(req.body);
    await book.save();
    res.status(201).json(book);
});

router.get('/books', async (req, res) => {
    const books = await Book.find().populate('categoryId');
    res.json(books);
});

router.put('/books/:id', async (req, res) => {
    const book = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(book);
});

module.exports = router;