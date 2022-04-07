
const connection = require('../app/database')

class UserService {
    async create(user) {
        const { name, pwd } = user;
        const statement = `INSERT INTO users (name, password) VALUES (?, ?)`
        
        const result = await connection.execute(statement, [name, pwd]);
        
        // 将user存储到数据库
        return result[0];
    }

    async getUserByName(name) {
        const statement = `select * from users where name=?`;
        let result = ""
        try {
            result = await connection.execute(statement, [name]);
        } catch (error) {
            console.log(error);
        }
        return result[0];
    }
    async updataAvatarUrlById(avatarUrl, userId) {
        const statement = `update users set avatar_url = ? where id = ?`;
        const [result] = await connection.execute(statement, [avatarUrl, userId]);
        return result;
    }
}
module.exports = new UserService();