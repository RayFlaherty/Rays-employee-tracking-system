
require ('dotenv').config();
const inquirer = require ('inquirer');
require ("console.table");
const mysql = require('mysql2/promise');
//const employeeData = require('./utils/employeeData');
const EmployeeData = require ('./utils/EmployeeData');

async function init(){
    try{
        const connection = await mysql.createConnection({
            host: process.env.DB_HOST||'localhost',
            user: process.env.DB_USER_NAME||'root' ,
            password: process.env.DB_PASSWORD||'Vandy1',
            database: process.env.DB_NAME||'employee_tracker'
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
                    'Update / Delete an employee',
                    'Exit'
                ]
            })

            switch (selection.choice) {
                case 'View all Departments':
                    console.table(await employeeData.viewDepartments())
                    break;
                case 'Add a Department':
                    const departments = await inquirer.prompt({
                        type:'input',
                        message: 'What is the name of the new department?',
                        name: 'newDeptName',
                        validate: (name) => name !== ""
                    })
                    console.table(await employeeData.addDepartment(departments.newDeptName))
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
                            name: 'last_name',
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

                    case 'View all Roles':
                        console.table(await employeeData.viewRoles())
                        break;
                    case 'Add a role':
                        const roleInfo= [
                            {
                                type: 'input',
                                name: 'title',
                                message: "What's the new role title?",
                                validate: (answer) => answer !== '',
                            },
                            {
                                type: 'input',
                                name: 'salary',
                                message: "What's the new role's salary?",
                                validate: (answers)=> answers !== '',
                            },
                            {
                                type: 'input',
                                name: 'department_id',
                                message: "What is the department_id?",
                                validate: (answers)=> answers !== ''
                            }
                        ]

                   

                    const roleAnswers = await inquirer.prompt (roleInfo);
                        console.table (await employeeData.addRole(roleAnswers))
                        break;

                    case 'Update / Delete an employee':
                        const updateEmployee= await inquirer.prompt({
                            
                                type: 'list',
                                name: 'update/delete',
                                message: "Update or Delete employee?",
                                choices: [
                                    'Update',
                                    'Delete'
                                ]
                            
                            }) 

                            switch (updateEmployee.choice) {    
                                case 'Delete':
                                    console.table(await employeeData.viewEmployees())
                                    const deleteEmployee= await inquirer.prompt(
                                        {
                                        type: 'input',
                                        name: 'delete',
                                        message: "What Employee ID would you like to delete?",
                                        validate: (answers) => answers !== ''
                                        })

                                break;
                                }



                            
                        


                        const updateAnswers = await inquirer.prompt (updateEmployee);
                        console.table(await employeeData.updateEmployee(updateAnswers))


                        // switch (updateEmployee.choice) {    
                        //     case 'Delete':
                        //         console.table(await employeeData.viewEmployees())
                        //         const deleteEmployee= await inquirer.prompt(
                        //             {
                        //             type: 'input',
                        //             name: 'delete',
                        //             message: "What Employee ID would you like to delete?",
                        //             validate: (answers) => answers !== ''
                        //             })
                        const deleteInfo = await inquirer.prompt (deleteEmployee)
                        console.table (await employeeData.deleteEmployee(deleteInfo))       
                              
                        //};

                       
                                                
                       

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