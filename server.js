const express = require('express');
const mysql = require('mysql2');
const cTable = require('console.table');
const { default: inquirer } = require('inquirer');

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connect to database
const db = mysql.createConnection(
  {
    host: 'localhost',
    user: 'root',
    password: 'rootroot',
    database: 'employee_tracker_db'
  },
  console.log(`Connected to the employee_tracker_db database.`)
);

// Query database
db.query('SELECT * FROM students', function (err, results) {
  console.log(results);
});

function askQuestion ()  {
    inquirer.prompt([
    {
        type: "list",
        message: "What would you like to do?",
        name: "choice", 
        choices: [

            "View all departments", 
            "View all roles", 
            "view all employees", 
            "add a department", 
            "add a role", 
            "add an employee", 
            "update an employee role"

        ]    
    }])

};

function viewDepartments (){
    // then i am presented with a formatted table showing department names & department id
}

function viewRoles () {
    // then i am presented with the job title, role id, the department that role belongs to, and the salary for that role
} 

function viewEmployees () {
    // formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
}

function addDepartment () {
    // prompted to enter the name of the department and that department is added to the database
}

function addRole () {
    // prompted to enter the name, salary, and department for the role and that role is added to the database
    inquirer.prompt([
        {
            name: "roleName",
            type: "input", 
            message: "What is the role?"
        },
        {
            name: "salary", 
            type: "input", 
            message: "What is the salary for this role?"
        }, 
        {
            name: "roleDepartment", 
            type: "input", 
            message: "What is the department associated with this role?"
        }
    ])
}

function addEmployee () {
    // prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database
    inquirer.prompt([
        {
            name: "firstName",
            type:"input", 
            message: "What is the employee's first name?" 
        },
        {
            name: "lastName",
            type:"input", 
            message: "What is the employee's last name?"
        },
        {
            name: "role",
            type:"input", 
            message: "What is the employee's role"
        }, 
        {
            name: "manager",
            type:"input", 
            message: "Who is the employee's manager?"
        }

    ])
}

function updateEmployeeRole () {
    // prompted to select an employee to update and their new role and this information is updated in the database 
}