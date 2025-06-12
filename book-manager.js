const express = require('express');
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');

const app = express();
const port = 8080;

app.use(bodyParser.json());

// In-memory book store
let books = [];

// POST /books - add a book
app.post('/books', (req, res) => {
    const { name, author } = req.body;
    if (!name || !author) {
        return res.status(400).json({ error: 'Book name and author are required.' });
    }
    const book = { id: uuidv4(), name, author };
    books.push(book);
    res.status(201).json(book);
});

// GET /books - get all books
app.get('/books', (req, res) => {
    res.json(books);
});

// GET /books/:id - get book by id
app.get('/books/:id', (req, res) => {
    const book = books.find(b => b.id === req.params.id);
    if (!book) {
        return res.status(404).json({ error: 'Book not found.' });
    }
    res.json(book);
});

app.listen(port, () => {
    console.log(`Book manager service running on port ${port}`);
});
