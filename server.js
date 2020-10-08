const mysql = require("mysql");
const inquirer = require("inquirer");

connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "timmit3p",
  database: "employeeTracker_db"
});

connection.connect(function(err) {
    if (err) throw err;
    employeeFind();
  });

function employeeFind() {
    inquirer
        .prompt({
            name: "action",
            type: "rawlist",
            message: "What would you like to do?",
            choices: [
                "View All Employees",
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
                case "View All Employees":
                    viewEmployee();
                    break;
                
                case "View All Employees by department":
                    viewAllEmployee();
                    break;

                case "View All Employees by manager":
                    viewEmployeeMan();
                    break;

                case "Add Employee":
                    addEmployee();
                    break;

                case "Delete Employee":
                    deleteEmployee();
                    break;

                case "Update Employee position":
                    updateEmployee();
                    break;

                case "View all position":
                    viewAllPosition();
                    break;

                case "Add position":
                    addPosition();
                    break;

                case "Delete position":
                    deletePosition();
                    break;
            }
        });
}