-- Runs once, when the MySQL volume is first created (as root).
-- The main database and user come from MYSQL_DATABASE / MYSQL_USER in .env.
-- Here we add a separate database for automated tests, so running tests
-- never wipes your development data.
-- Note: the user name must match MYSQL_USER in .env.

CREATE DATABASE IF NOT EXISTS langlearn_test
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_0900_ai_ci;

GRANT ALL PRIVILEGES ON langlearn_test.* TO 'langlearn'@'%';
