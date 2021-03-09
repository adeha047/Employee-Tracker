USE employee_db;


INSERT departments (name) VALUES 
('Accounting'),
('Marketing'),
('Operations'),
('HR'),
('Sales'),
('Development');

INSERT roles (title, salary, department_id) VALUES 
('Specialist', '62000.00', 1),
('Engineer', '98000.00', 6),
('Developer', '120000.00', 6),
('Junior Developer', '84000.00', 6),
('Intern', '18000.00', 2);

INSERT employees (first_name, last_name, role_id) VALUES 
('Benjamin', 'Mendy', 2),
('Erling', 'Haaland', 5),
('Lionel', 'Messi', 3),
('Pele', 'da Silva', 3),
('Jerome', 'Boateng', 4), 
('Mia', 'Hamm',3),
('Meloney', 'Pennyloafer', 5),
('Helga', 'Gerhard',1 ),
('Monica', 'Pavard', 2),
('Naomi', 'Campbell', 4);

SELECT * FROM employees; 

SELECT * FROM departments; 

SELECT * FROM roles; 

SELECT * FROM employees a JOIN 
-- we only match the row when the artist is the same and the year is the same
ON a.artist = b.artist AND a.year = b.year;

-- SELECT employees.id, employees.first_name, employees.last_name, roles.title, roles.salary, departments.name FROM employees
-- JOIN roles ON employees.role_id = roles.id
-- JOIN departments ON department.id = roles.department_id
-- WHERE departments.id = ?;

-- SELECT employees.role_id, employees.first_name, employees.last_name
-- FROM departments
-- INNER JOIN roles ON roles.department_id = 6

-- SELECT e.id, e.first_name, e.last_name, r.title, d.name AS department 
-- FROM employee e
-- JOIN role r
-- ON e.role_id = r.id
-- JOIN department d
-- ON d.id = r.department_id
-- WHERE d.id = ?-- 


