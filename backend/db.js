require('dotenv').config(); // Prevent race conditions 
const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt'); // What is this for entirely
const mysql = require('mysql2');
const path = require('path');

const app = express();
app.use(cors());              // allow your static site / dev ports
app.use(express.json());      // parse JSON
app.use(express.static('public')); // serves index.html, styles.css, script.js



// Connection db
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


module.exports = connection;