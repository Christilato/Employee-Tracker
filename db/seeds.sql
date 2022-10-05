INSERT INTO departments (name)
VALUES ("Legal"),
       ("Finance"),
       ("Engineering"),
       ("Sales");

INSERT INTO role (title, salary, department_id)
VALUES ("Lawyer", 190000, 1),
       ("Legal Team Lead", 250000, 1),
       ("Accountant", 125000, 2),
       ("Account Manager", 160000, 2),
       ("Software Engineer", 120000, 3),
       ("Lead Engineer", 150000, 3),
       ("Salesperson", 80000, 4),
       ("Sales Manager", 90000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("John", "Doe", 1, null),
       ("Mike", "Chan", 2, 1),
       ("Ashley", "Rodriguez", 3, 4),
       ("Kevin", "Tupik", 4, null),
       ("Kunal", "Singh", 5, 7),
       ("Malia", "Brown", 8, null),
       ("Sarah", "Lourd", 6, null),
       ("Tom", "Allen", 7, 6);
