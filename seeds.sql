Use employTracker_db;

INSERT INTO department (branch)
VALUES ("Sales"), ("Legal"), ("Finance"), ("Engineering");

INSERT INTO position (salary, title, department_id)
VALUES (100000, "Lead Salesperson", (SELECT id FROM department WHERE branch = "Sales")), 
        (80000, "Salesperson", (SELECT id FROM department WHERE branch = "Sales")),
        (150000, "Lead Engineer", (SELECT id FROM department WHERE branch = "Engineering")),
        (120000, "Software Engineer", (SELECT id FROM department WHERE branch = "Engineering")),
        (125000, "Accountant", (SELECT id FROM department WHERE branch = "Finance")),
        (250000, "Legal Team Lead", (SELECT id FROM department WHERE branch = "Legal")),
        (190000, "Lawyer", (SELECT id FROM department WHERE branch = "Legal")),
        (120000, "Software Engineer 2", (SELECT id FROM department WHERE branch = "Engineering"));

INSERT INTO employee (first_name, last_name, position_id)
VALUES ("Jake", "House", (SELECT id FROM position WHERE title = "Lead Salesperson")),
        ("Jill", "Maker", (SELECT id FROM position WHERE title = "Salesperson")),
        ("Joesph", "Jacobs", (SELECT id FROM position WHERE title = "Lead Engineer")),
        ("John", "Smith", (SELECT id FROM position WHERE title = "Software Engineer")),
        ("Jason", "Stanton", (SELECT id FROM position WHERE title = "Accountant")),
        ("Aaron", "Blackmen", (SELECT id FROM position WHERE title = "Legal Team Lead")),
        ("Zack", "Macmen", (SELECT id FROM position WHERE title = "Lawyer")),
        ("Carl", "Vinson", (SELECT id FROM position WHERE title = "Software Engineer"));

UPDATE employee
SET manager_id = 1
WHERE id = 2;

UPDATE employee
SET manager_id = 3
WHERE id = 4;

UPDATE employee
SET manager_id = 3
WHERE id = 7;

UPDATE employee
SET manager_id = 5
WHERE id = 6;

