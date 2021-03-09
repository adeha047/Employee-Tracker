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
                "Add Employee",
                "Remove Employee",
                "Update Employee",
                "Add Employee's role",
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

            case "Add Employee":
                addEmployee();
                break;

            case "Remove Employee":
                RemoveEmployee();
                break;

            case "Update Employee":
                updateEmployee();
                break;

            case "Add Employee's Role":
                addEmployeesRole();
                break;

            default:
            // code block
        }




    });



}

function viewEmployees() {
    connection.query("SELECT employees.id, employees.first_name, employees.last_name, roles.title, roles.salary, departments.name FROM employees, roles, departments WHERE departments.id = roles.department_id AND roles.id = employees.role_id ORDER BY employees.id ASC;", function (err, res) {
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
                message: "How would you like to begin?",
                name: "department",
                choices: departmentNames
            }
        ]).then(res => {
            console.log(res)
            // let query = `SELECT e.id, e.first_name, e.last_name, r.title, d.name AS department 
            // FROM employee e
            // JOIN role r
            //   ON e.role_id = r.id
            // JOIN department d
            // ON d.id = r.department_id
            // WHERE d.id = ?`

        })


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
                name: "salary",
                message: "What is the employee's salary?"
            }
        ])



    });

}



// * The command-line application should allow users to:

//   * Add departments, roles, employees

//   * View departments, roles, employees

//   * Update employee roles