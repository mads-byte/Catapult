-- CREATE DATABASE IF NOT EXISTS hopehacks;
-- USE hopehacks;

-- CREATE TABLE IF NOT EXISTS user_profiles (
--   id INT AUTO_INCREMENT PRIMARY KEY,
--   username      VARCHAR(100) NOT NULL UNIQUE,
--   email         VARCHAR(255) NOT NULL UNIQUE,
--   password_hash VARCHAR(255) NOT NULL,
--   first_name    VARCHAR(100) NOT NULL,
--   last_name     VARCHAR(100) NOT NULL,
--   created_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP
-- );


-- USE hopehacks;
-- SELECT id, username, email, first_name, last_name, created_at
-- FROM user_profiles
-- ORDER BY created_at DESC
-- LIMIT 50;


SELECT DATABASE() AS current_db;           -- should be 'hopehacks'

SHOW TABLES IN hopehacks;

-- If user_profiles is missing, create it now:
CREATE TABLE IF NOT EXISTS hopehacks.user_profiles (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username      VARCHAR(100) NOT NULL UNIQUE,
  email         VARCHAR(255) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  first_name    VARCHAR(100) NOT NULL,
  last_name     VARCHAR(100) NOT NULL,
  created_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- See what’s there:
SELECT COUNT(*) AS total FROM hopehacks.user_profiles;

SELECT id, username, email, first_name, last_name, created_at
FROM hopehacks.user_profiles
ORDER BY created_at DESC
LIMIT 50;


SELECT id, username, email, first_name, last_name, created_at
FROM hopehacks.user_profiles
ORDER BY created_at DESC
LIMIT 50;
