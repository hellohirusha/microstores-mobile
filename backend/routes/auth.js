const express = require('express');
const bcrypt = require('bcryptjs');
const { generateToken } = require('../utils/jwt');
const { createUser, getUserByEmail } = require('../models/userModel');

const router = express.Router();

router.post('/register', (req, res) => {
  const { email, password, role } = req.body;
  const hash = bcrypt.hashSync(password, 8);

  createUser(email, hash, role, (err, result) => {
    if (err) return res.status(500).json({ error: err });
    const token = generateToken({ id: result.insertId, role });
    res.json({ token });
  });
});

router.post('/login', (req, res) => {
  const { email, password } = req.body;

  getUserByEmail(email, (err, users) => {
    if (err) return res.status(500).json({ error: err });
    if (users.length === 0) return res.status(400).json({ error: 'User not found' });

    const user = users[0];
    if (!bcrypt.compareSync(password, user.password_hash))
      return res.status(400).json({ error: 'Invalid password' });

    const token = generateToken({ id: user.id, role: user.role });
    res.json({ token });
  });
});

module.exports = router;
