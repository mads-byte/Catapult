// db.js
const mysql = require('mysql2/promise');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT || 3306),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  ssl: {
    ca: fs.readFileSync(path.join(__dirname, 'certs', 'global-bundle.pem'), 'utf8'),
  },
  waitForConnections: true,
  connectionLimit: 10,
});

module.exports = pool;




// // Code to create account and push into table 
// form.addEventListener('submit', async (e) => {
//     e.preventDefault();
//     showError('');
//     joinBtn.disabled = true;

//     const payload = validate();
//     if (!payload) { joinBtn.disabled = false; return; }

//     try {
//       const res = await fetch('/api/users', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(payload),
//       });
//       const data = await res.json();
//       if (!res.ok) throw new Error(data?.error || 'Signup failed.');

//       form.reset();
//       alert('Account created successfully!');
//     } catch (err) {
//       showError(err.message);
//     } finally {
//       joinBtn.disabled = false;
//     }
// });