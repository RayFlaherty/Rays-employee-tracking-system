INSERT INTO departments (departments_name)
VALUES
    ('Payroll'),
    ('Recruitment'),
    ('Development');


INSERT INTO roles (title, salary,departments_id)
VALUES
    ('Manager', 80000,1),
    ('Engineer', 60000,1),
    ('Intern', 30000,1);

INSERT INTO employees (last_name, first_name, roles_id, manager_id)
VALUES
    ('Flaherty', 'Raymond', 1,NULL),
    ('Grant','Henry',2,1),
    ('Benjamin','William',3,1);
    