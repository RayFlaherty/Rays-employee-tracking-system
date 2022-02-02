
class EmployeeData {
constructor (connection) {
    this.db= connection
}

    async viewDepartments() {
        const sql = 'SELECT * FROM departments';
        console.log('reading viewDepartments')
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
    async addDepartment (departments) {
        const sql = `INSERT INTO departments (name) VALUES (?)`;
        const [ result ] = await this.db.execute (sql, [departments])
        if (result.affectedRows === 1) return this.viewDepartments()
    }
    async addEmployee ({ last_name, first_name, roles_id, manager_id}) {
        try {
            const sql = `INSERT INTO employees (last_name, first_name, roles_id, manager_id) VALUES (?,?,?,?)`;
            const [ result ] = await this.db.execute(sql, [last_name,first_name,roles_id, manager_id])
            if (result.affectedRows === 1) return this.viewEmployee()
        } catch (error) {
            return 'Please enter valid roles_id or manager_id\n'
        }
    }
};

module.exports = EmployeeData