const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt'); //
const userRoutes = require('./backend/users');
const signInRouter = require('./backend/signin');
require('dotenv').config();
const db = require('./backend/db');
const app = express();


app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(express.static('public'));

// Sessions 
const isProd = process.env.NODE_ENV === 'production';
const store = new MySQLStore(dbConfig);

app.use(session({
  secret: process.env.SESSION_SECRET || 'dev-secret-change-me',
  store,
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
// confirm DB connectivity
app.get('/health/db', async (req, res) => {
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
//  API
// Node fetch
const marketStackURL = 'https://api.marketstack.com/v2/eod?access_key=${MS_API_KEY}&symbols=AAPL'
const stockDataURL = 'https://api.stockdata.org/v1/data/quote?symbols=AAPL,TSLA,MSFT&api_token=${SD_API_KEY}'
// MarketStack: End of Day (EOD)
// GET /api/marketstack/eod?symbols=AAPL,TSLA&limit=1
app.get('/api/marketstack/eod', async (req, res) => {
  try {
    const symbols = (req.query.symbols || 'AAPL').toUpperCase();
    const limit = Number(req.query.limit || 1);
    const url = new URL(`${MARKETSTACK_BASE}/eod`);
    url.searchParams.set('access_key', process.env.MS_API_KEY);
    url.searchParams.set('symbols', symbols);
    url.searchParams.set('limit', String(limit));
    const r = await fetch(url);
    if (!r.ok) throw new Error(`MarketStack ${r.status}`);
    const json = await r.json();
    // Optional
    res.json(json);
  } catch (err) {
    console.error('MarketStack error:', err);
    res.status(502).json({ error: 'MarketStack fetch failed' });
  }
});
// real-time quotes
// GET /api/stockdata/quotes?symbols=AAPL,TSLA,MSFT
app.get('/api/stockdata/quotes', async (req, res) => {
  try {
    const symbols = (req.query.symbols || 'AAPL').toUpperCase();
    const url = new URL(`${STOCKDATA_BASE}/data/quote`);
    url.searchParams.set('symbols', symbols);
    url.searchParams.set('api_token', process.env.SD_API_KEY);
    const r = await fetch(url);
    if (!r.ok) throw new Error(`StockData ${r.status}`);
    const json = await r.json();
    res.json(json);
  } catch (err) {
    console.error('StockData error:', err);
    res.status(502).json({ error: 'StockData fetch failed' });
  }
});
const PORT = Number(process.env.PORT || 3000);
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});








