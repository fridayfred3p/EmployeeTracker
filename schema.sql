DROP DATABASE IF EXISTS employTracker_db;

CREATE DATABASE employTracker_db;

USE employTracker_db;


CREATE TABLE department (
    id int NOT NULL AUTO_INCREMENT,
    branch VARCHAR(30) NOT NULL,
    PRIMARY KEY (id)
);
CREATE TABLE position (
    id int NOT NULL AUTO_INCREMENT,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL,
    department_id int NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (department_id) REFERENCES department (id)
);

CREATE TABLE employee (
    id int NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    position_id int NOT NULL,
    manager_id int,
    PRIMARY KEY (id),
    FOREIGN KEY (position_id) REFERENCES position (id),
    FOREIGN KEY (manager_id) REFERENCES employee (id)
);
