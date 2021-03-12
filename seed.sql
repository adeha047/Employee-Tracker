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
('Engineer', '98000.00', 3),
('Developer', '120000.00', 3),
('Junior Developer', '84000.00', 6),
('Intern', '18000.00', 2);

INSERT employees (first_name, last_name, role_id) VALUES 
('Benjamin', 'Mendy', 2),
('Erling', 'Haaland', 5),
('Lionel', 'Messi', 3),
('Pele', 'da Silva', 3),
('Jerome', 'Boateng', 6), 
('Mia', 'Hamm',3),
('Meloney', 'Pennyloafer', 6),
('Helga', 'Gerhard',1 ),
('Monica', 'Pavard', 2),
('Naomi', 'Campbell', 4);

-- SELECT * FROM employees; 

-- SELECT * FROM departments; 

-- SELECT * FROM roles; 



-- SELECT employees.first_name, employees.last_name
-- FROM employees
-- INNER JOIN departments ON roles.department_id = departments.name;

-- SELECT employees.id, employees.first_name, employees.last_name, roles.title, roles.salary, departments.name FROM employees
-- JOIN roles ON employees.role_id = roles.id
-- JOIN departments ON department.id = roles.department_id
-- WHERE departments.id = ?;

-- SELECT employees.role_id, employees.first_name, employees.last_name
-- FROM departments
-- INNER JOIN roles ON roles.department_id = 6

-- SELECT employees.id, employees.first_name, e.last_name, r.title, d.name AS department 
-- FROM employees
-- JOIN roles
-- ON employees.roles_id = roles.id
-- JOIN department 
-- ON departments.id = roles.department_id;
 

-- SELECT * FROM employees; 
-- SELECT * FROM departments; 


-- SELECT employees.first_name, employees.last_name, departments.name, departments.id
-- FROM departments
-- INNER JOIN employees ON employees.role_id = departments.id
-- WHERE departments.id;

-- UPDATE employees SET role_id = 4 WHERE id = 1; 

SELECT roles.id, roles.title, roles.salary FROM roles ORDER BY roles.id ASC;


