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
                "View All Employees by department",
                "View All Employees by manager",
                "Add Employee",
                "Delete Employee",
                "Update Employee position",
                "Update Employee manager",
                "View all position",
                "Add position",
                "Delete position"
            ]
        })
        .then(function(answer) {
            switch (answer.action) {
                case "View departments, position, employees":
                    viewAll();
                    break;
                
                // case "View All Employees by department":
                //     viewAllEmployee();
                //     break;

                // case "View All Employees by manager":
                //     viewEmployeeMan();
                //     break;

                // case "Add Employee":
                //     addEmployee();
                //     break;

                // case "Delete Employee":
                //     deleteEmployee();
                //     break;

                // case "Update Employee position":
                //     updateEmployee();
                //     break;

                 case "View all position":
                     viewAllPosition();
                     break;

                // case "Add position":
                //     addPosition();
                //     break;

                // case "Delete position":
                //     deletePosition();
                //     break;
            }
        });
}

function viewAll() {
    inquirer.prompt([{
        name: "action",
        type: "rawlist",
        message: "What would you like to view",
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

