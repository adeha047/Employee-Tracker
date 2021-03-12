const inquirer = require("inquirer");
const mysql = require("mysql");


// connect to the database
const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "rootroot",
    port: 3306,
    database: "employee_db"
});

connection.connect((err) => {
    if (err) throw err;
    console.log('connected as id ' + connection.threadId);
    beginPrompt();
});

function beginPrompt() {

    inquirer.prompt([
        {
            type: "list",
            message: "How would you like to begin?",
            name: "choices",
            choices: ["View all Employees",
                "View all employees by Department",
                "View all Roles",
                "Add Employee",
                "Remove Employee",
                "Update Employee",
                "Add roles",
                "EXIT"]
        }
    ]).then(function ({ choices }) {
        switch (choices) {
            case "View all Employees":
                viewEmployees()
                break;

            case "View all employees by Department":
                viewEmployeesByDepartment();
                break;

            case "View all Roles":
                viewRoles();
                break;

            case "Add Employee":
                addEmployee();
                break;

            case "Remove Employee":
                removeEmployee();
                break;

            case "Update Employee":
                updateEmployee();
                break;

            case "Add roles":
                addRoles();
                break;

            default:
            // code block
        }




    });

}

function viewEmployees() {
    connection.query("SELECT employees.id, employees.first_name, employees.last_name, roles.id, roles.title, roles.salary, departments.name FROM employees, roles, departments WHERE departments.id = roles.department_id AND roles.id = employees.role_id ORDER BY employees.id ASC;", function (err, res) {
        if (err) throw err;
        console.table(res);
        console.log("All Employees")

        beginPrompt();

    });

}

function viewEmployeesByDepartment() {
    connection.query("SELECT departments.name, departments.id FROM departments", function (err, res) {
        if (err) throw err;
        const departmentNames = res.map(department => {
            return {
                name: department.name,
                value: department.id
            }

        });

        inquirer.prompt([
            {
                type: "list",
                message: "Which department would you like to choose?",
                name: "department",
                choices: departmentNames
            }
        ]).then(res => {
            // console.log(res)
            let query = `SELECT employees.first_name, employees.last_name, departments.name, departments.id FROM departments INNER JOIN employees ON employees.role_id = departments.id WHERE departments.id = ?`;
            connection.query(query, res.department, function (err, res) {
                if (err) throw err;

                console.table(res);

                beginPrompt();
            });
        });
    });

}

function viewRoles() {
    connection.query("SELECT roles.id, roles.title, roles.salary FROM roles ORDER BY roles.id ASC", function (err, res) {
        if (err) throw err;
        console.table(res);
        console.log("All Roles")

        beginPrompt();

    });
}

function addEmployee() {
    connection.query("SELECT roles.id, roles.title, roles.salary FROM roles", function (err, res) {
        if (err) throw err;

        const roleChoices = res.map(({ id, title, salary }) => ({
            value: id, title: `${title}`, salary: `${salary}`
        }))

        inquirer.prompt([
            {
                type: "input",
                name: "first_name",
                message: "What is the employee's first name?"
            },

            {
                type: "input",
                name: "last_name",
                message: "What is the employee's last name?"
            },

            {
                type: "input",
                name: "title",
                message: "What is the employee's title?"
            },

            {
                type: "input",
                name: "roleId",
                message: "What is the employee's role?"
            }
        ])
            .then(res => {
                let query = `INSERT INTO employees SET ?`;
                connection.query(query,
                    {
                        first_name: res.first_name,
                        last_name: res.last_name,
                        role_id: res.roleId,
                    },
                    function (err, res) {
                        if (err) throw err;

                        console.table(res);
                        console.log("Inserted successfully!\n");

                        beginPrompt();
                    })

            })



    });

}

function removeEmployee() {
    connection.query("SELECT employees.id, employees.first_name, employees.last_name FROM employees", function (err, res) {
        if (err) throw err;

        const employeesNames = res.map(({ id, first_name, last_name }) => ({
            value: id, name: `${id} ${first_name} ${last_name}`
        }));
        inquirer.prompt([
            {
                type: "list",
                message: "Which employee would you like to remove?",
                name: "employees_Names",
                choices: employeesNames
            }
        ]).then(res => {
            console.log(res)

            let query = `DELETE FROM employees WHERE ?`;
            // when finished prompting, insert a new item into the db with that info
            connection.query(query,
                { id: res.employees_Names },
                function (err, res) {
                    if (err) throw err;

                    console.table(res);
                    console.log("Removed employee successfully!\n");

                    beginPrompt();
                })

        })


    });

}

function updateEmployee() {
    // connection.query("SELECT employees.id, employees.first_name, employees.last_name, roles.title, roles.salary FROM employees, roles", function (err, res) {
        connection.query("SELECT employees.id, employees.first_name, employees.last_name, role_id FROM employees", function (err, res) {
        if (err) throw err;

        const updatedNames = res.map(({ id, first_name, last_name, role_id }) => ({
            value: id, name: `${id} ${first_name} ${last_name} ${role_id}`
        }));
        connection.query("SELECT roles.id, roles.title, roles.salary FROM roles", function (err, res) {
            if (err) throw err;

        const updatedRoles = res.map(({ id, title, salary }) => ({
            value: id, name: `${id} ${title} ${salary}`

        }));

        inquirer.prompt([
            {
                type: "list",
                message: "Which employee would you like to update?",
                name: "employeeUpdate",
                choices: updatedNames
            },

            {
                type: "list",
                message: "Which role would you like this employee to be updated with?",
                name: "roleUpdate",
                choices: updatedRoles
            }

        ])
            .then(res => {
                console.log(res)
                let query = `UPDATE employees SET role_id = ? WHERE id = ?`;
                connection.query(query,
                    [{
                        role_id: res.employeeUpdate,
                        
                    },
                    {
                        id: res.roleUpdate
                    }, 
                ],
                    function (err, res) {
                        if (err) throw err;

                        console.table(res);
                        console.log("Updated employee successfully!\n");
                        beginPrompt();
                    });

            });
        })


    });

}

function addRoles() {
    connection.query("SELECT roles.id, roles.title, roles.salary FROM roles", function (err, res) {
        if (err) throw err;

        const addDepartment = res.map(({ id, title, salary, department_id }) => ({
            value: id, title: `${title}`, salary: `${salary}`, department: `${department_id}`
        }));
        inquirer.prompt([
            {
                type: "input",
                name: "newRolename",
                message: "What is the name of the new role?"
            },

            {
                type: "input",
                name: "salary",
                message: "What will the salary of this role be?"

            },

            {
                type: "list",
                name: "roleUpdate",
                message: "Which department would you like to add this role to? ",
                name: "addDep",
                choices: addDepartment


            }
        ])
            .then(res => {
                let query = `INSERT INTO roles SET ?`;
                connection.query(query,
                    {
                        title: res.newRolename,
                        salary: res.salary,
                        department_id: res.addDep,
                    },
                    function (err, res) {
                        if (err) throw err;

                        console.table(res);
                        console.log("Inserted successfully!\n");

                        beginPrompt();
                    })
            });


    });
}


// * The command-line application should allow users to:

//   * Add departments, roles, employees

//   * View departments, roles, employees

//   * Update employee roles