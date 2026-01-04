const db = require('../db');

function createStore(ownerId, name, description, callback) {
  const query = 'INSERT INTO stores (owner_id, name, description) VALUES (?, ?, ?)';
  db.query(query, [ownerId, name, description], callback);
}

function getStoreById(id, callback) {
  const query = 'SELECT * FROM stores WHERE id = ?';
  db.query(query, [id], callback);
}

function getStores(callback) {
  const query = 'SELECT * FROM stores';
  db.query(query, callback);
}

function getStoresByOwner(ownerId, callback) {
  const query = 'SELECT * FROM stores WHERE owner_id = ?';
  db.query(query, [ownerId], callback);
}

module.exports = { createStore, getStoreById, getStores, getStoresByOwner };
