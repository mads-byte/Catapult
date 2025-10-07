// backend/progress.js
const express = require('express');
const router = express.Router();
const { pool } = require('./db');

function requireAuth(req, res, next) {
  if (!req.session?.userId) return res.status(401).json({ error: 'Auth required' });
  next();
}

// POST progress
router.post('/api/progress', requireAuth, async (req, res) => {
  const { lessons } = req.body;
  if (!Array.isArray(lessons) || lessons.length !== 6) {
    return res.status(400).json({ error: 'lessons must be an array of length 6' });
  }

  const json = JSON.stringify(lessons);

  await pool.query(
    `INSERT INTO hopehacks.user_progress (user_id, lessons_progress)
     VALUES (?, CAST(? AS JSON))
     ON DUPLICATE KEY UPDATE lessons_progress = VALUES(lessons_progress), updated_at = CURRENT_TIMESTAMP`,
    [req.session.userId, json]
  );

  res.json({ success: true });
});


// GET progress
router.get('/api/progress', requireAuth, async (req, res) => {
  const [rows] = await pool.query(
    `SELECT lessons_progress, updated_at
     FROM hopehacks.user_progress
     WHERE user_id = ?`,
    [req.session.userId]
  );
  if (rows.length === 0) return res.json({ lessons: null });
  res.json({ lessons: rows[0].lessons_progress, updated_at: rows[0].updated_at });
});

module.exports = router;
