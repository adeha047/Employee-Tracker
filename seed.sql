USE employee_db;

INSERT employees (first_name, last_name) VALUES 
('Benjamin', 'Mendy'),
('Erling', 'Haaland'),
('Lionel', 'Messi'),
('Pele', 'da Silva'),
('Jerome', 'Boateng'), 
('Mia', 'Hamm'),
('Meloney', 'Pennyloafer'),
('Helga', 'Gerhard'),
('Monica', 'Pavard'),
('Naomi', 'Campbell');


INSERT departments (name) VALUES 
('Accounting'),
('Marketing'),
('Operations'),
('HR'),
('Sales'),
('Development');

INSERT roles (title, salary) VALUES 
('Specialist', '62000.00'),
('Engineer', '98000.00'),
('Developer', '120000.00'),
('Junior Developer', '84000.00'),
('Intern', '18000.00');

SELECT * FROM employees; 

SELECT * FROM department; 

SELECT * FROM roles; 

