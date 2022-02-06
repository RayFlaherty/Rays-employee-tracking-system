
class EmployeeData {
constructor (connection) {
    this.db= connection
}

    async viewDepartments() {
        const sql = 'SELECT * FROM departments';
        
        const [ rows ] = await this.db.query(sql)
        return rows
    }
    async viewEmployees(){
        const sql = `
        SELECT e.id,e.last_name,e.first_name,roles.title AS title, departments.department_name AS departments, roles.salary AS salary,
        CONCAT(m.last_name, ' ', m.first_name) AS manager
        FROM employee e
        LEFT JOIN roles ON e.role_id= roles.id
        LEFT JOIN departments ON roles.department_id = departments.id
        LEFT JOIN employee m ON m.id = e.manager_id`

        const [ rows ] = await this.db.query(sql)
        return rows
    }

    async viewRoles(){
        const sql = `SELECT * FROM roles`;
        const [rows]= await this.db.query(sql)
        return rows
    }

    async addDepartment (departments) {
        const sql = `INSERT INTO departments (department_name) VALUES (?)`;
        const [ result ] = await this.db.execute (sql, [departments])
        if (result.affectedRows === 1) return this.viewDepartments()
    }
    async addRole ({title, salary, department_id}) {
        //console.log (roles)
        const sql = `INSERT INTO roles (title, salary, department_id) VALUES (?,?,?)`;
        const [result] = await this.db.execute (sql, [title, salary, department_id])
        
        if (result.affectedRows === 1) return this.viewRoles()

    }

    async addEmployee ({ last_name, first_name, role_id, manager_id}) {
        try {
            console.log(last_name, first_name, role_id, manager_id)
            const sql = `INSERT INTO employee (last_name, first_name, role_id, manager_id) VALUES (?,?,?,?)`;
            const [ result ] = await this.db.execute(sql, [last_name,first_name, role_id, manager_id])
            if (result.affectedRows === 1) return this.viewEmployees()
        } catch (error) {
            console.log(error)
            return 'Please enter valid roles_id or manager_id\n'
        }
    }
};



module.exports = EmployeeData