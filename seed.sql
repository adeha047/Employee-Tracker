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

SELECT employees.id, employees.first_name, employees.last_name, roles.title, roles.salary, departments.name FROM employees, roles, departments 
WHERE 6 = roles.department_id AND roles.id = employees.role_id
GROUP BY employees.id;

