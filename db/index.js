const connection = require("./connection");


class DB {
    constructor (connection) {
        this.connection = connection;
    }


    findAllEmployees () {
        return this.connection.promise().query(
        "SELECT employee.id, employee.first_name, employee.last_name, role.title, departments.name AS departments, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN departments on role.department_id = departments.id LEFT JOIN employee manager on manager.id = employee.manager_id;"
        );
    }

      
   
    findAllDepartments () {
        return this.connection.promise().query(
            "SELECT employee.first_name, employee.last_name, departments.name AS departments FROM employee JOIN role ON employee.role_id = role.id JOIN departments ON role.department_id ORDER BY employee.id;"
        );
    }
    
    findAllRoles () {
        return this.connection.promise().query(
            "SELECT employee.first_name, employee.last_name, role.title AS Title FROM employee employee JOIN role ON employee.role_id = role.id;"
        );
    }
   

    createEmployee (employee) {
        return this.connection.promise.query(
            "INSERT INTO employee SET ?", employee
        );
    }

    createRole (role) {
        return this.connection.promise().query(
            "INSERT INTO role SET ?", role
        );
    }
    createDepartment (department) {
        return this.connection.promise().query(
            "INSERT INTO departments SET ?", departments
        );
    }

    // newEmployeeUpdated () {
    //     return.this.connection.promise().query(
    //         "SELECT employee.last_name, role.title FROM employee JOIN role ON employee.role_id = role.id;"
    //     )
    // }
};

module.exports = new DB(connection);