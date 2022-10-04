const connection = require("./connection");

class DB {
    constructor (connection) {
        this.connection = connection;
    }
    findAllEmployees () {
        return this.connection.promise().query(
            "SELECT employee.id, employee.first_name, employee.last_name, role.name_role, departments.name_department AS department, role.salary, CONCAT (manager.first_name, " ", manager.last_name) AS manager FROM employee LEFT JOIN role on employee.role_id LEFT JOIN departments on role.department_id = departments.id LEFT JOIN employee manager on manager.id = employee.manager_id;"
        );
    }
    createRole (role) {
        return this.connection.promise().query(
            "INSERT INTO role SET ?", role
        );
    }
    findAllDepartments () {
        return this.connection.promise().query(
            "SELECT departments.id, departments.name FROM departments;"
        );
    }
};