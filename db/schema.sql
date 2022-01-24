 USE employee_tracker;
 
 CREATE TABLE department (
     id INTEGER AUTO_INCREMENT PRIMARY KEY,
     department_name VARCHAR(30) NOT NULL
     );

CREATE TABLE role (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL NOT NULL,
    department_id INTEGER, 
    FOREIGN KEY (department_id) references department(id)
);

CREATE TABLE employee (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR (30) NOT NULL,
    role_id INTEGER,
    FOREIGN KEY (role_id) references role(id),
    manager_id INTEGER,
    FOREIGN KEY (manager_id) references employee(id)
)
