INSERT INTO departments (id, department_name)
VALUES
    (1,'Payroll'),
    (2,'Recruitment'),
    (3,'Development');


INSERT INTO roles (title, salary,department_id)
VALUES
    ('Manager', 80000,1),
    ('Engineer', 60000,1),
    ('Intern', 30000,1);

INSERT INTO employee (last_name, first_name, role_id, manager_id)
VALUES
    ('Flaherty', 'Raymond', 1,NULL),
    ('Grant','Henry',2,1),
    ('Benjamin','William',3,1);
    