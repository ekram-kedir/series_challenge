const express = require('express');
const cors = require('cors');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'build')));

// Define routes and middleware here
const db = new sqlite3.Database('database.db');

// Endpoint to fetch all products from the database
app.get('/api/products', (req, res) => {
    const query = 'SELECT * FROM products';
    db.all(query, (err, rows) => {
      if (err) {
        console.error('Error fetching products:', err);
        res.status(500).json({ error: 'Internal Server Error' });
      } else {
        res.json(rows);
      }
    });
});


// Endpoint to fetch a specific product by ID from the database
app.get('/api/products/:productId', (req, res) => {
    const productId = req.params.productId;
    const query = 'SELECT * FROM products WHERE id = ?';
    db.get(query, [productId], (err, row) => {
      if (err) {
        console.error('Error fetching product:', err);
        res.status(500).json({ error: 'Internal Server Error' });
      } else if (row) {
        res.json(row);
      } else {
        res.status(404).json({ message: 'Product not found' });
      }
    });
  });
  

// Catch all other routes and return the React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
