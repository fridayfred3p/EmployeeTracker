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
                "Update employee roles",
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

                // case "Update employee roles":
                //     viewEmployeeMan();
                //     break;

                // case "Update employee manager":
                //     addEmployee();
                //     break;

                // case "View employee by manager":
                //     deleteEmployee();
                //     break;

                // case "Update Employee position":
                //     updateEmployee();
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
        console.log(answer);
        connection.query(newD, answer.addD, function(err, res) {
            if (err) throw err;
                console.table(res);
                firstQuestion();
        });
    });
};