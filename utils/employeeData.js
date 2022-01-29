class employeeData {
    async viewDepartments() {
        const sql = `SELECT * FROM departments`;
        const [rows] = await this.db.query(sql)
        return rows
    }
    async viewEmployees(){
        const sql = `
        SELECT e.id,e.last_name,e.first_name,roles.title AS title, departments.name AS department, roles.salary AS salary,
        CONCAT(m.last_name, ' ', m.first.name) AS manager
        FROM employee e
        LEFT JOIN roles ON e.role_id= roles.id
        LEFT JOIN departments ON roles.department_id = departments.id
        LEFT JOIN employees m ON m.id = e.manager_id`

        const [ rows ] = await this.db.query(sql)
        return rows
    }
    async addDepartment (department) {
        const sql = `INSERT INTO department (name) VALUES (?)`;
        const [ result ] = await this.db.execute (sql, [department])
        if (result.affectedRows === 1) return this.viewDepartments()
    }
    async addEmployee ({ last_name, first_name, role_id, manager_id}) {
        try {
            const sql = `INSERT INTO employees (last_name, first_name, role_id, manager_id) VALUES (?,?,?,?)`;
            const [ result ] = await this.db.execute(sql, [last_name,first_name,role_id, manager_id])
            if (result.affectedRows === 1) return this.viewEmployees()
        } catch (error) {
            return 'Please enter valid role_id or manager_id\n'
        }
    }
};

module.exports = employeeData