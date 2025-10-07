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



//Connection db
const connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'password',
  database: 'HOPE Hacks Database',
});

connection.connect(err => {
  if (err) throw err;
  console.log('Connected to MySql')
});

connection
  .promise()
  .query('SELECT * FROM user_profiles')
  .then(([rows]) => {
    console.log(rows);
  })

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
