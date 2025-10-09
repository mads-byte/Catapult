// backend/signin.js
const express = require('express');
const router = express.Router();
const { pool } = require('./db');
const bcrypt = require('bcrypt');

router.post('/api/signin', async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password)
    return res.status(400).json({ error: 'Missing username or password' });

  try {
    const [rows] = await pool.query(
      'SELECT id, password_hash, first_name, last_name FROM hopehacks.user_profiles WHERE username = ? LIMIT 1',
      [username]
    );
    if (rows.length !== 1) return res.status(401).json({ error: 'Invalid credentials' });

    const u = rows[0];
    const ok = await bcrypt.compare(password, u.password_hash);
    if (!ok) return res.status(401).json({ error: 'Invalid credentials' });

    // persist identity for this session
    req.session.userId = u.id;
    req.session.username = username;

    res.json({
      success: true,
      user: { id: u.id, username, first_name: u.first_name, last_name: u.last_name },
    });
    sessionStorage.setItem('name', `${u.first_name}`)
  } catch (err) {
    console.error('signin error', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// helper
router.get('/api/me', (req, res) => {
  if (!req.session?.userId) return res.status(200).json({ user: null });
  res.json({
    user: { id: req.session.userId, username: req.session.username }
  });
});

// Logout
router.post('/api/logout', (req, res) => {
  req.session.destroy(() => {
    res.clearCookie('hh.sid');
    res.json({ success: true });
  });
});

module.exports = router;

