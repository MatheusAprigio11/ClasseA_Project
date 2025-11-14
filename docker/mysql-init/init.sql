CREATE DATABASE IF NOT EXISTS appdb;

CREATE USER IF NOT EXISTS 'appuser'@'%' IDENTIFIED BY 'apppassword';
GRANT ALL PRIVILEGES ON appdb.* TO 'appuser'@'%';
FLUSH PRIVILEGES;

USE appdb;

INSERT INTO users (name, email, password_hash)
VALUES 
  ('Admin', 'admin@example.com', '$2a$10$QzqzqzqzqzqzqzqzqzqzuqVtZxr3t3jts1W2uP9uJxJf8xXJxZW'), -- password: admin123
  ('User', 'user@example.com', '$2a$10$FlflflflflflflflflflfN3iP6vZprE8sdhD8D2CkMyO3lYqN3E85');   -- password: user123;