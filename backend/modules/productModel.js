const db = require('../db');

function createProduct(storeId, name, price, imageUrl, stock, callback) {
  const query = 'INSERT INTO products (store_id, name, price, image_url, stock) VALUES (?, ?, ?, ?, ?)';
  db.query(query, [storeId, name, price, imageUrl, stock], callback);
}

function getProductById(id, callback) {
  const query = 'SELECT * FROM products WHERE id = ?';
  db.query(query, [id], callback);
}

function getProductsByStore(storeId, callback) {
  const query = 'SELECT * FROM products WHERE store_id = ?';
  db.query(query, [storeId], callback);
}

function updateProductStock(id, stock, callback) {
  const query = 'UPDATE products SET stock = ? WHERE id = ?';
  db.query(query, [stock, id], callback);
}

module.exports = { createProduct, getProductById, getProductsByStore, updateProductStock };
