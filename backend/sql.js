// backend/sql.js
const { pool } = require('./db');

async function ensureProgressTable() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS hopehacks.user_progress (
      user_id INT NOT NULL,
      lessons_progress JSON NOT NULL,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      PRIMARY KEY (user_id),
      FOREIGN KEY (user_id) REFERENCES hopehacks.user_profiles(id)
        ON DELETE CASCADE ON UPDATE CASCADE
    )
  `);
  console.log('✅ user_progress table ready');
}

if (require.main === module) {
  ensureProgressTable()
    .then(() => process.exit(0))
    .catch(err => { console.error(err); process.exit(1); });
}

module.exports = { ensureProgressTable };