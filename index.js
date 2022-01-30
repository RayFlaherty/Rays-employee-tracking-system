require ('dotenv').config();
const inquirer = require ('inquirer');
require ("console.table");
const mysql = require('mysql2/promise');
//const employeeData = require('./utils/employeeData');
const EmployeeData = require ('./utils/EmployeeData');

async function init(){
    try{
        const connection = await mysql.createConnection({
            host: process.env.DB_HOST,
            database: process.env.DB_DATABASE = 'employee_tracker',
            user: process.env.DB_USER = 'root',
            password: process.env.DB_PASS = 'Vandy1'
        })

        const employeeData = new EmployeeData(connection)

        let exit = false

        while (exit === false) {
            const selection = await inquirer.prompt({
                type: 'list',
                name: 'choice',
                message: 'What would you like to do?',
                choices: [
                    'View all Departments',
                    'View all Roles',
                    'View all Employees',
                    'Add a Department',
                    'Add a role',
                    'Add an employee',
                    'Update an employee role',
                    'Exit'
                ]
            })

            switch (selection.choice) {
                case 'View all Departments':
                    console.table(await employeeData.viewDepartments())
                    break;
                case 'Add a Department':
                    const department = await inquirer.prompt({
                        type:'input',
                        message: 'What is the name of the new department?',
                        name: 'newDeptName',
                        validate: (name) => name !== ""
                    })
                    console.table(await employeeData.addDepartment(department.newDeptName))
                    break;
                case 'View all Employees':
                    console.table(await employeeData.viewEmployees())
                    break;
                case 'Add an employee':
                    const info = [
                        {
                            type: 'input',
                            name: 'first_name',
                            message: "What is the employee's first name?",
                            validate: (answer) => answer !== '',
                        },
                        {
                            type:'input',
                            name: 'lat_name',
                            message: "What is the employee's last name?",
                            validate: (answer) => answer !== '',
                        },
                        {
                            type: 'input',
                            name: 'role_id',
                            message: "What is the employee's role id",
                            validate: (answer) => answer !== '',
                        },
                        {
                            type:'input',
                            name: 'manager_id',
                            message: "What is the manager_id?",
                            validate: (answer) => answer !== '',
                        },
                    ];
                    const answers = await inquirer.prompt (info);
                        console.table(await employeeData.addEmployee(answers))
                        break;

                        case 'Exit':
                            connection.destroy()
                            process.exit(0)

                        default:
                            break;
                }

        }
    } catch (error) {
        if (error) console.log(error)
    }
}

init();