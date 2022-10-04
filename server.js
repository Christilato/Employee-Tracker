const { prompt } = require('inquirer');
const cT = require('console.table');
const db = require('./db');



function askQuestion ()  {
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
]).then ( res => {
    let choice = res.choice
    switch (choice) {
        case "VIEW_DEPARTMENTS":
            viewDepartments();
            break;
        case "VIEW_ROLES":
            viewRoles();
            break;
        case "VIEW_EMPLOYEES":
            viewEmployees();
            break;
        // case "ADD_DEPARTMENT":
        //     addDepartment();
        //     break;
        // case "ADD_ROLE":
        //     addRole();
        //     break;
        // case "ADD_EMPLOYEE":
        //     addEmployee();
        //     break;
        // case "UPDATE_EMPLOYEE": 
        //     updateEmployeeRole();
        //     break;
        default : 
            quit ();
    }

})

};

function viewDepartments (){
    // then i am presented with a formatted table showing department names & department id
    db.findAllDepartments()
    .then (([rows]) => {
        let departments = rows;
        console.log("\n");
        console.table(employees);
    })
    .then (() => askQuestion ());
}

function viewRoles () {
    // then i am presented with the job title, role id, the department that role belongs to, and the salary for that role
    db.findAllRoles ()
    .then (([rows]) => {
        let roles = rows;
        console.log("\n");
        console.table(roles);
    })
    .then (() => askQuestion ());
} 

function viewEmployees () {
    // formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
    db.findAllEmployees() 
    .then (([rows]) => {
        let employees = rows;
        console.log("\n");
        console.table(employees);
    })
    .then (() => askQuestion());
}

// function addDepartment () {
//     // prompted to enter the name of the department and that department is added to the database
//     db.findAllDepartments ()
//     .then (([rows]) => {
//         let addToDepartment = rows;
//         const addToDepartment = departments.map (({id, name}) => ({
//             name: name, 
//             value: id,
//         }));
//         prompt ([
//             {
//                 name: "departmentName",
//                 type: "input",
//                 message: "What Department would you like to add?"
//             }            
//         ])
//         .then (employee => {
//             db.createDepartment(department)
//             .then (() => console.log(`added ${department.name} to the datatbase`))
//             .then (() => askQuestion());
//         });
//     })
// }

// function addRole () {
//     // prompted to enter the name, salary, and department for the role and that role is added to the database
//     db.findAllDepartments() 
//     .then(([rows]) => {
//         let departments = rows;
//         const departmentChoices = departments.map (({id,name}) => ({
//             name: name,
//             value: id,
//         }));
//         prompt([
//             {
//                 name: "roleName",
//                 message: "What is the role?"
//             },
//             {
//                 name: "salary", 
//                 message: "What is the salary for this role?"
//             }, 
//             {
//                 name: "roleDepartment", 
//                 type: "list", 
//                 message: "What is the department associated with this role?",
//                 choices: departmentChoices
//             }
//         ])
//         .then (role => {
//             db.createRole(role)
//             .then (() => console.log(`added ${role.name_role} to the database`))
//             .then (() => askQuestion());
//         });
//     })
    
    
    
    
// }

// function addEmployee () {
//     // prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database
//     db.findAllDepartments ()
//     .then(([rows]) => {
//         let employee = rows;
//         const employeeChoices = departments.map (({id, name}) => ({
//             name: name, 
//             value: id,
//         }));
//         prompt([
//             {
//                 name: "firstName",
//                 type:"input", 
//                 message: "What is the employee's first name?" 
//             },
//             {
//                 name: "lastName",
//                 type:"input", 
//                 message: "What is the employee's last name?"
//             },
//             {
//                 name: "role",
//                 type:"input", 
//                 message: "What is the employee's role"
//             }, 
//             {
//                 name: "manager",
//                 type:"input", 
//                 message: "Who is the employee's manager?"
//             }
    
//         ])
//         .then( role => {
//             db.createEmployee(employee)
//             .then(() => console.log(`added new employee to the database`))
//             .then (() => askQuestion());
//         });

//     })
    
// }

// function updateEmployeeRole () {
//     // prompted to select an employee to update and their new role and this information is updated in the database 
// }