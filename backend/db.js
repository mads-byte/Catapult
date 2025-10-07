require('dotenv').config();
const mysql = require('mysql2/promise');
const fs = require('fs');
const path = require('path');


const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT || 3306),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
});

module.exports = pool;


pool.query('SELECT * FROM user_profiles')
  .then(([rows]) => {
    console.log(rows);
  })
  .catch(err => {
    console.error(err);
  });



