INSERT INTO departments (name)
VALUES ("Legal"),
       ("Finance"),
       ("Engineering"),
       ("Sales"),

INSERT INTO role (title, salary, department_id)
VALUES ("Lawyer", 190000, 8),
       ("Legal Team Lead", 250000, 7),
       ("Accountant", 125000, 6),
       ("Account Manager", 160000, 5),
       ("Software Engineer", 120000, 4);
       ("Lead Engineer", 150000, 3);
       ("Salesperson", 80000, 2);

INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUES ("John", "Doe", null, 1),
       ("Mike", "Chan", 1, 2),
       ("Ashley", "Rodriguez", null, 3),
       ("Kevin", "Tupik", 3, 4),
       ("Kunal", "Singh", null, 5);
       ("Malia", "Brown", 5, 6);
       ("Sarah", "Lourd", null, 7);
       ("Tom", "Allen", 7, 8);