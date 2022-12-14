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
            "SELECT departments.id, departments.name FROM departments;"
        );
    }
    
    findAllRoles () {
        return this.connection.promise().query(
            "SELECT role.id, role.title, departments.name AS department, role.salary FROM role LEFT JOIN departments ON role.department_id = departments.id;"
        );
    }
   

    createEmployee (employee) {
        return this.connection.promise().query(
            "INSERT INTO employee SET ?", employee
        );
    }

    createRole (role) {
        return this.connection.promise().query(
            "INSERT INTO role SET ?", role
        );
    }
    createDepartment (departments) {
        return this.connection.promise().query(
            "INSERT INTO departments SET ?", departments
        );
    }

    newEmployeeUpdated (roleId, employeeId) {
        return this.connection.promise().query(
            "UPDATE employee SET role_id = ? WHERE id = ?", [roleId, employeeId]
        );
    }
};

module.exports = new DB(connection);