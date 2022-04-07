const connection = require('../app/database')
class AuthService {
    async login(name, pwd) {
        const statement = `SELECT * FROM users WHERE name=? and password = ?`;
        const result = await connection.execute(statement, [name, pwd]);
        return result;
    }
    async checkResource(tableName, id, userId) {
        const statement = `SELECT * FROM ${tableName} where id = ? and user_id = ?`;
        const [result] = await connection.execute(statement, [id, userId]);
        return result.length === 0 ? false : true;
    }
}

module.exports = new AuthService();