DROP DATABASE IF EXISTS  employee_db;

-- Created the DB " employee_db" (only works on local connections)
CREATE DATABASE employee_db;

-- Use the DB employee_db for all the rest of the script
USE  employee_db;

-- Created the table "employess"
CREATE TABLE employees(
  id INTEGER AUTO_INCREMENT NOT NULL,
  first name VARCHAR(30) NOT NULL,
  last name VARCHAR(30) NOT NULL,
  PRIMARY KEY(id)
);

CREATE TABLE department(
  id INTEGER AUTO_INCREMENT NOT NULL,
  name VARCHAR(30) NOT NULL,
  PRIMARY KEY(id)
);

CREATE TABLE roles(
  id INTEGER AUTO_INCREMENT NOT NULL,
  title VARCHAR(30) NOT NULL, 
  salary DECIMAL(20) NOT NULL,
  PRIMARY KEY(id)
);

SELECT * FROM employees;