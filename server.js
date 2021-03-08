const inquirer = require("inquirer");
const mysql = require("mysql");


// connect to the database
const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "rootroot",
    port: 3306,
    database: "greatbay_db"
});

connection.connect( (err) => {
    if(err) throw err;
    askFirstQuestions();
});