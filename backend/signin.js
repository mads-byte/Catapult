const express = require('express');
const router = express.Router();
const pool = require('./db');
const bcrypt = require('bcrypt');

router.post('/api/signin', async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ error: 'Missing username or password' });
    }

    try {
        const [rows] = await pool.query(
            'SELECT password_hash FROM user_profiles WHERE username = ? LIMIT 1',
            [username]
        );
        if (rows.length === 1) {
            const hash = rows[0].password_hash;
            const match = await bcrypt.compare(password, hash);
            if (match) {
                return res.json({ success: true });
            }
        }
        return res.status(401).json({ error: 'Invalid credentials' });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;