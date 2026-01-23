CREATE TABLE user(id INT PRIMARY KEY, username VARCHAR(50), email VARCHAR(50), password VARCHAR(50) UNIQUE);
CREATE TABLE Teacher(id INT PRIMARY KEY, username VARCHAR(50) NOT NULL UNIQUE, email VARCHAR(50) NOT NULL UNIQUE,password VARCHAR(50) NOT NULL);
INSERT INTO Teacher(id, username, email, password) VALUES ('213', 'ASDF', 'fdsg@dfsf', '43536');