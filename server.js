const mysql = require("mysql");
const inquirer = require("inquirer");
const showEmployee = "SELECT * FROM employee";
const showPosition = "SELECT * FROM position";
const showDepartment = "SELECT * FROM department";

connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "timmit3p",
  database: "employTracker_db"
});

connection.connect(function(err) {
    if (err) throw err;
    console.table(`
    
============================================================
|                                                          |
|                                                          |
|      ______                 _                            |
|     |   __/ _ __ ___  _ __ | | ___  _   _  ___  ___      |
|     |   _| |  _ '  _ \\  _ \\| |/ _ \\| | | |/ _ \\/ _ \\     |
|     |  |___  | | | | | |_) | | (_) | |_| |  __/  __/     |
|     |______|_| |_| |_|  __/|_|\\___/\\___, |\\___|\\___|     |
|                      |__|           |___/                |
|                                                          |
|                                                          |
|                   >>>----TRACKER---->                    |
|                                                          |
|                                                          |
============================================================
`)
    firstQuestion();
});

function firstQuestion() {
    inquirer
        .prompt({
            name: "action",
            type: "rawlist",
            message: "What would you like to do?",
            choices: [
                "View departments, position, employees",
                "Add departments, position, employees",
                "Update employee position",
                "Update employee manager",
                "View employee by manager",
                "Delete departments, position, employees"
            ]
        })
        .then(function(answer) {
            switch (answer.action) {
                case "View departments, position, employees":
                    viewAll();
                    break;
                
                case "Add departments, position, employees":
                    addAll();
                    break;

                case "Update employee position":
                    updateEmployee();
                    break;

                // case "Update employee manager":
                //     addEmployee();
                //     break;

                // case "View employee by manager":
                //     deleteEmployee();
                //     break;

                //  case "Delete departments, position, employees":
                //      deleteStuff();
                //      break;
            }
        });
}

function viewAll() {
    inquirer.prompt([{
        name: "action",
        type: "rawlist",
        message: "What would you like to view?",
        choices: ["departments", "employees", "position"]
    }]).then(function(answer) {
        switch (answer.action) {
            case "employees":
                if (answer.action === "employees") {
                    connection.query(showEmployee, function(err, res) {
                        if (err) throw err;
                        console.table(res);
                        firstQuestion();
                    })
                }
                break;
        };
        switch (answer.action) {
            case "position":
                if (answer.action === "position") {
                    connection.query(showPosition, function(err, res) {
                        if (err) throw err;
                        console.table(res);
                        firstQuestion();
                    });
                };
                break;
        };
        switch (answer.action) {
            case "departments":
                if (answer.action === "departments") {
                    connection.query(showDepartment, function(err, res){
                        if (err) throw err;
                        console.table(res);
                        firstQuestion();
                    });
                };
                break;
        };
    });
};

function addAll() {
    inquirer.prompt([{
        name: "action",
        type: "rawlist",
        message: "Would you like to add to the department, position, or employees?",
        choices: ["departments", "position", "employees"]
    }]).then(function(answer){
        switch (answer.action) {
            case "departments":
                if (answer.action === "departments") {
                    addDepartments();
                };
            case "position":
                if (answer.action === "position") {
                    addPosition();
                };
            case "employees":
                if (answer.action === "employees") {
                    addEmployees();
                };
        };
    });
};

function addDepartments() {
    inquirer.prompt([{
        name: "addD",
        type: "input",
        message: "Which department would you like to add?"
    }]).then(function(answer) {
        let newD = "INSERT INTO department (branch) VALUES (?)";
        // console.log(answer);
        connection.query(newD, answer.addD, function(err, res) {
            if (err) throw err;
                console.table(res);
                firstQuestion();
        });
    });
};

function addPosition() {
    inquirer.prompt([{
        name: "title",
        type: "input",
        message: "Which the title of the position you would like to add?"
    },
    {
        name: "salary",
        type: "number",
        message: "What is the salary of the new position?"
    },
    {
        name: "department_id",
        type: "number",
        message: "What is the department ID of new position?"
    }]).then(function(answer) {
        let positionValues = {
            title: answer.title,
            salary: answer.salary,
            department_id: answer.department_id
        };
        let placePosition = "INSERT INTO position SET ?";
        connection.query(placePosition, positionValues, function(err, res) {
            if (err) throw err;
            console.table(res);
            firstQuestion();
        })
    });
};

function addEmployees() {
    inquirer.prompt([{
        name: "first_name",
        type: "input",
        message: "What is the first name of the new employee?"
    },{
        name: "last_name",
        type: "input",
        message: "What is the last name of the new employee?"
    },
    {
        name: "position_id",
        type: "number",
        message: "What is the position id of the new employee?"
    },
    {
        name: "manager_id",
        type: "number",
        message: "What is the manager id of this new employees' manager?"
    }]).then(function(answer) {
        let employeeValues = {
            first_name: answer.first_name,
            last_name: answer.last_name,
            position_id: answer.position_id,
            manager_id: answer.manager_id
        };
        let placeEmployee = "INSERT INTO employee SET ?";
        connection.query(placeEmployee, employeeValues, function(err, res) {
            if (err) throw err;
            console.table(res);
            firstQuestion();
        });
    });
};

function updateEmployee() {
    inquirer.prompt([{
        name: "position_id",
        type: "number",
        message: "What is the new position id of the employee"
    },
    {
        name: "employee_id",
        type: "number",
        message: "What is the employee id of the person which will be in the new position"
    }]).then(function(answer) {
        let newEmployee = [
            answer.position_id,
            answer.employee_id
        ];
        let newUpdate = "UPDATE employee SET position_id = ? WHERE id = ?";
        connection.query(newUpdate, newEmployee, function(err, res) {
            if (err) throw err;
            console.log("New employee position changed!")
            firstQuestion();
        });
    });
};