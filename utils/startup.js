require('dotenv').config()
const inquirer = require('inquirer')
require("console.table")
const mysql = require('mysql2/promise');
const Company = require('./employeeData')

const getStartMenu = () => {
    
    console.log('             ==========================')
    console.log("           Let's build an employee Database")
    console.log('            Follow the prompts and enjoy!')
    console.log('             ==========================')

inquirer
    .prompt({
        type:"list",
        message:"Are you ready to begin?",
        name:"choice",
        choices: ["Yes","No"],
    })
    .then(({choice}) => {
        switch (choice) {
            case "Yes":
                new Company ();
                return "Let's Begin"
                
            case "No":
                console.log("Restart Program when you're ready")

        }
    })
}

const company = new Company()

		let exit = false

		while (exit === false) {
			const selection = inquirer.prompt({
				type: 'list',
				name: 'choice',
				message: 'What would you like to do?',
				choices: [
					'View All Departments',
					'View All Roles',
					'View All Employees',
					'Add A Department',
					'Add A role',
					'Add An Employee',
					'Update an employee role',
					'Exit'
				]
			});
	
			switch (selection.choice) {
				case 'View All Departments':
					console.table( company.viewAllDepartments())
					break;
				case 'Add A Department':
					const department =  inquirer.prompt({
						type: 'input',
						message: 'What is the name of the new department?',
						name: 'nameOfNewDept',
						validate: (name) => name !== ""
					})
					console.table( company.addANewDepartment(department.nameOfNewDept))
					break;

				case 'View All Employees':
					console.table(company.viewAllEmployees())
					break;
				case 'Add An Employee':
					const questions = [
            {
              type: 'input',
              name: 'first_name',
              message: "What is the employee's first name?",
              validate: (answer) => answer !== '',
            },
            {
              type: 'input',
              name: 'last_name',
              message: "What is the employee's last name?",
              validate: (answer) => answer !== '',
            },
            {
							type: 'input',
              name: 'role_id',
              message: "What is the employee's role id?",
							validate: (answer) => answer !== '',
            },
            {
              type: 'input',
              name: 'manager_id',
              message: "Who is the employee's manager id?",
							validate: (answer) => answer !== '',
            },
          ];

          const answers =  inquirer.prompt(questions);
					console.table( company.addANewEmployee(answers))
					break;

				case 'Exit':
					connection.destroy()
					process.exit(0)

				default:
					break;
			}
		}


	//     } catch (error) {
	//     	if (error) console.log(error)
	//     }
    // }

module.exports= (getStartMenu);