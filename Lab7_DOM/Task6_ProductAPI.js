const express = require('express');
const app = express();
const products = [
    { id: 1, name: "Laptop", price: 900 },
    { id: 2, name: "Mouse", price: 20 },
    { id: 3, name: "Keyboard", price: 50 }
];
app.get('/products', (req, res) => {
    res.json(products);
});
app.get('/products/:id', (req, res) => {
    const product = products.find(p => p.id === parseInt(req.params.id));
    if (!product) {
        return res.status(404).send("Product not found");
    }
    res.json(product);
});
app.listen(3000, () => {
    console.log('Task 6 Server running on http://localhost:3000');
});