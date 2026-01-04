const db = require('../db');

function createUser(email, passwordHash, role, callback) {
  const query = 'INSERT INTO users (email, password_hash, role) VALUES (?, ?, ?)';
  db.query(query, [email, passwordHash, role], callback);
}

function getUserByEmail(email, callback) {
  const query = 'SELECT * FROM users WHERE email = ?';
  db.query(query, [email], callback);
}

function getUserById(id, callback) {
  const query = 'SELECT * FROM users WHERE id = ?';
  db.query(query, [id], callback);
}

module.exports = { createUser, getUserByEmail, getUserById };
