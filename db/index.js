const connection = require("./connection");

class DB {
    constructor (connection) {
        this.connection = connection;
    }
    findAllEmployees () {
        return this.connection.promise().query(
            "SELECT employee.id, employee.first_name, employee.last_name, role.name_role, departments.name_department AS department, role.salary, CONCAT(manager.first_name, " ", manager.last_name) AS manager FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN departments ON role.department_id = departments.id LEFT JOIN employee manager ON manager.id = employee.manager_id;"
        );
    
    }
    findAllDepartments () {
        return this.connection.promise().query(
            "SELECT departments.id, departments.name FROM departments;"
        );
    }
    findAllRoles () {
        return this.connection.promise().query(
            "SELECT role.id, role.name_role, role.salary, role.department_id FROM role;"
        );
    }

    createRole (role) {
        return this.connection.promise().query(
            "INSERT INTO role SET ?", role
        );
    }
    createDepartment () {
        return this.connection.promise().query(
            "INSERT INTO departments SET ?", departments
        );
    }
};