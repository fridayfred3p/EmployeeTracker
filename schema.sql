DROP DATABASE IF EXISTS employTracker_db;

CREATE DATABASE employTracker_db;

USE employTracker_db;
CREATE TABLE employee(
    id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR (30) NOT NULL,
    last_name VARCHAR (30) NOT NULL,
    role_id INT,
    manager_id INT,
    PRIMARY KEY (id),
    FOREIGN KEY (role_id, manager_id);

);

SELECT * FROM employTracker_db;