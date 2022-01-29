INSERT INTO department (id, department_name)
VALUES
    (1,'Payroll'),
    (2,'Recruitment'),
    (3,'Development');


INSERT INTO role (id, title, salary,department_id)
VALUES
    (1,'Manager', 80000,1),
    (2,'Engineer', 60000,1),
    (3,'Intern', 30000,1);

INSERT INTO employee (id, last_name, first_name, role_id, manager_id)
VALUES
    (1,'Flaherty', 'Raymond', 1,NULL),
    (2,'Grant','Henry',2,1),
    (3,'Benjamin','William',3,1);
    