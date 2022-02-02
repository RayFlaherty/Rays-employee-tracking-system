DROP TABLE IF EXISTS departments;
DROP TABLE IF EXISTS roles;
DROP TABLE IF EXISTS employee;
 
CREATE TABLE departments (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    departments_name VARCHAR(30) NOT NULL
    );

CREATE TABLE roles (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL NOT NULL,
    departments_id INTEGER, 
    FOREIGN KEY (departments_id) references departments(id)
);

CREATE TABLE employee (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    last_name VARCHAR(30) NOT NULL,
    first_name VARCHAR (30) NOT NULL,
    roles_id INTEGER,
    FOREIGN KEY (roles_id) references roles(id),
    manager_id INTEGER,
    FOREIGN KEY (manager_id) references employee(id)
);

