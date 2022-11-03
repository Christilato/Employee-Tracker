const { prompt } = require('inquirer');
const cT = require('console.table');
const classDB = require("./db/index.js");
const db = require("./db/connection.js");
const { listenerCount } = require('./db/connection.js');

db.connect(function (err) {
    if (err) throw err;
    console.log(`Connected to the employee_tracker_db database.`)
    askQuestion();
});

function askQuestion() {
    prompt([
        {
            type: "list",
            message: "What would you like to do?",
            name: "choice",
            choices: [
                {
                    name: "View All Employees",
                    value: "VIEW_EMPLOYEES"
                },
                {
                    name: "View All Departments",
                    value: "VIEW_DEPARTMENTS"
                },
                {
                    name: "View All Role",
                    value: "VIEW_ROLES"
                },
                {
                    name: "Add a department",
                    value: "ADD_DEPARTMENT"
                },
                {
                    name: "Add a role",
                    value: "ADD_ROLE"
                },
                {
                    name: "Add an employee",
                    value: "ADD_EMPLOYEE"
                },
                {
                    name: "Update an employee role",
                    value: "UPDATE_EMPLOYEE"
                },
                {
                    name: "Quit",
                    value: "QUIT"
                }
            ]
        }
    ]).then(res => {
        let choice = res.choice
        switch (choice)
        {
            case "VIEW_DEPARTMENTS":
                viewDepartments();
                break;
            case "VIEW_ROLES":
                viewRoles();
                break;
            case "VIEW_EMPLOYEES":
                viewEmployees();
                break;
            case "ADD_DEPARTMENT":
                addDepartment();
                break;
            case "ADD_ROLE":
                addRole();
                break;
            case "ADD_EMPLOYEE":
                addEmployee();
                break;
            case "UPDATE_EMPLOYEE": 
                updateEmployeeRole();
                break;
            default:
                quit();
        }

    })

};

function viewDepartments() {
    // then i am presented with a formatted table showing department names & department id
    classDB.findAllDepartments()
        .then(([rows]) => {
            let departments = rows;
            console.log("\n");
            console.table(departments);
        })
        .then(() => askQuestion());
}

function viewRoles() {
    // then i am presented with the job title, role id, the department that role belongs to, and the salary for that role
    classDB.findAllRoles()
        .then(([rows]) => {
            let roles = rows;
            console.log("\n");
            console.table(roles);
        })
        .then(() => askQuestion());
}

function viewEmployees() {
    // formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
    classDB.findAllEmployees()
        .then(([rows]) => {
            let employees = rows;
            console.log("\n");
            console.table(employees);
        })
        .then(() => askQuestion());
}


function addDepartment() {
    // prompted to enter the name of the department and that department is added to the database
    prompt([
        {
            name: "name",
            type: "input",
            message: "What Department would you like to add?"
        }
    ])
        .then(res => {
            let name = res
            classDB.createDepartment(name)
                .then(() => console.log(`added ${name.name} to the datatbase`))
                .then(() => askQuestion());
        });

}

function addRole() {
    // prompted to enter the name, salary, and department for the role and that role is added to the database
    classDB.findAllDepartments()
        .then(([rows]) => {
            let departments = rows;
            const departmentChoices = departments.map(({ id, name }) => ({
                name: name,
                value: id,
            }));
            prompt([
                {
                    name: "title",
                    message: "What is the role?"
                },
                {
                    name: "salary",
                    message: "What is the salary for this role?"
                },
                {
                    name: "department_id",
                    type: "list",
                    message: "What is the department associated with this role?",
                    choices: departmentChoices
                }
            ])
                .then(role => {
                    classDB.createRole(role)
                        .then(() => console.log(`added ${role.title} to the database`))
                        .then(() => askQuestion());
                });
        })

}

function addEmployee() {
    // prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database
    prompt([
        {
            name: "first_name",
            type: "input",
            message: "What is the employee's first name?"
        },
        {
            name: "last_name",
            type: "input",
            message: "What is the employee's last name?"
        },

    ])
        .then(res => {
            let firstName = res.first_name
            let lastName = res.last_name
            classDB.findAllRoles()
                .then(([rows]) => {
                    let roles = rows
                    const roleChoices = roles.map(({ id, title }) => ({
                        name: title,
                        value: id
                    }));

                    prompt([
                        {
                            type: 'list',
                            name: 'role_id',
                            message: "What is the employee's role?",
                            choices: roleChoices
                        }
                    ])
                        .then(res => {
                            let roleId = res.role_id
                            classDB.findAllEmployees()
                                .then(([rows]) => {
                                    let employees = rows
                                    const managerChoices = employees.map(({ id, first_name, last_name }) => ({
                                        name: `${first_name} ${last_name}`,
                                        value: id
                                    }));
                                    managerChoices.unshift({ name: "None", value: null })
                                    prompt([
                                        {
                                            type: 'list',
                                            name: 'manager_id',
                                            message: "Who is the employee's manager?",
                                            choices: managerChoices
                                        }
                                    ])
                                        .then(res => {
                                            let employee = {
                                                manager_id: res.manager_id,
                                                role_id: roleId,
                                                first_name: firstName,
                                                last_name: lastName,
                                            }
                                            classDB.createEmployee(employee)
                                        })
                                        .then(() => console.log(`added ${firstName} ${lastName} to the database`))
                                        .then(() => askQuestion());
                                })
                        })
                })
        })

}

function updateEmployeeRole() {
    // prompted to select an employee to update and their new role and this information is updated in the database
    classDB.findAllEmployees()
        .then(([rows]) => {
            let employees = rows
            const employeeChoices = employees.map(({ id, first_name, last_name }) => ({
                name: `${first_name} ${last_name}`,
                value: id
            }))
            prompt([
                {
                    type: "list",
                    name: "employeeId",
                    message: "Which employee's role do you want to update?",
                    choices: employeeChoices
                }
            ])
                .then(res => {
                    let employeeId = res.employeeId
                    classDB.findAllRoles()
                        .then(([rows]) => {
                            let roles = rows
                            const roleChoices = roles.map(({ id, title }) => ({
                                name: title,
                                value: id
                            }))
                            prompt([
                                {
                                    type: "list",
                                    name: "roleId",
                                    message: "Which role do you want to assign to this employee?",
                                    choices: roleChoices
                                }
                            ])
                            .then(res => {
                                classDB.newEmployeeUpdated(res.roleId, employeeId)
                            })
                            .then(() => console.log("Updated Employee's role"))
                            .then(() => askQuestion());
                        })
                })
        })
}

function quit () {
    console.log("Goodbye")
    process.exit();
}