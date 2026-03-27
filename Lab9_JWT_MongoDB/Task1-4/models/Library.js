const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name: { type: String, required: true },
    section: { type: String, required: true }
});

const bookSchema = new mongoose.Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    isbn: { type: String, required: true },
    categoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' }
});

const Category = mongoose.model('Category', categorySchema);
const Book = mongoose.model('Book', bookSchema);

module.exports = { Category, Book };