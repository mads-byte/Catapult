// server.js
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);

const { pool, dbConfig } = require('./backend/db');

const userRoutes     = require('./backend/users');     // (create user)
const signInRouter   = require('./backend/signin');    // updated above to set session
const progressRouter = require('./backend/progress');  
const { ensureProgressTable } = require('./backend/sql');

const app = express();


app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(express.static('public'));

const PORT = process.env.PORT || 3000

// Sessions 
const isProd = process.env.NODE_ENV === 'production';

app.use(session({
  secret: process.env.SESSION_SECRET || 'dev-secret-change-me',
  name: 'hh.sid',
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: isProd,                      // 
    sameSite: isProd ? 'none' : 'lax',   // 
    maxAge: 1000 * 60 * 60 * 24 * 7,     // 7 days
  },
}));

// ensure table
ensureProgressTable().catch(console.error);

// ---- routes
app.use(userRoutes);
app.use(signInRouter);
app.use(progressRouter);

// health/debug helpers
app.get('/health/db', async (_req, res) => {
  try {
    const [[dbn]]  = await pool.query('SELECT DATABASE() AS db');
    const [[host]] = await pool.query('SELECT @@hostname AS host, @@port AS port');
    res.json({ db: dbn.db, host: host.host, port: host.port, ok: true });
  } catch (e) {
    res.status(500).json({ ok: false, error: e.message });
  }
});

app.get('/debug/users', async (_req, res) => {
  try {
    const [[cnt]] = await pool.query('SELECT COUNT(*) AS total FROM hopehacks.user_profiles');
    const [rows]  = await pool.query(`
      SELECT id, username, email, first_name, last_name, created_at
      FROM hopehacks.user_profiles
      ORDER BY created_at DESC
      LIMIT 10
    `);
    res.json({ total: cnt.total, sample: rows });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});



// Stock API routes
const MARKETSTACK_BASE = 'https://api.marketstack.com/v2';
const STOCKDATA_BASE   = 'https://api.stockdata.org/v1';

app.get('/api/marketstack/eod', async (req, res) => {
  try {
    const symbols = (req.query.symbols || 'AAPL').toUpperCase();
    const limit   = Number(req.query.limit || 1);
    if (!process.env.MS_API_KEY) return res.status(500).json({ error: 'MS_API_KEY missing' });

    const url = new URL(`${MARKETSTACK_BASE}/eod`);
    url.searchParams.set('access_key', process.env.MS_API_KEY);
    url.searchParams.set('symbols', symbols);
    url.searchParams.set('limit', String(limit));
    const r = await fetch(url);
    if (!r.ok) throw new Error(`MarketStack ${r.status}`);
    res.json(await r.json());
  } catch (err) {
    console.error('MarketStack error:', err);
    res.status(502).json({ error: 'MarketStack fetch failed' });
  }
});

app.get('/api/stockdata/quotes', async (req, res) => {
  try {
    const symbols = (req.query.symbols || 'AAPL').toUpperCase();
    if (!process.env.SD_API_KEY) return res.status(500).json({ error: 'SD_API_KEY missing' });

    const url = new URL(`${STOCKDATA_BASE}/data/quote`);
    url.searchParams.set('symbols', symbols);
    url.searchParams.set('api_token', process.env.SD_API_KEY);
    const r = await fetch(url);
    if (!r.ok) throw new Error(`StockData ${r.status}`);
    res.json(await r.json());
  } catch (err) {
    console.error('StockData error:', err);
    res.status(502).json({ error: 'StockData fetch failed' });
  }
});


app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});


