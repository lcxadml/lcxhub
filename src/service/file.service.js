const connection = require('../app/database')

class FileService {
    async saveAvatar(filename, mimetype, size, userId) {
        const statement = `insert into avatar (filename, mimetype, size, user_id) values (?, ?, ?, ?)`;
        const [reuslt] = await connection.execute(statement, [filename, mimetype, size, userId]);
        return reuslt;
    }
    async getAvatarByUserId (userId) {
        const statement = `select * from avatar where user_id = ?`;
        const [result] = await connection.execute(statement, [userId]);
        return result[0];
    }
    async createFile(filename, mimetype, size, userId, goodsId) {
        const statement = `insert into file (filename, mimetype, size, user_id, goods_id) values (?, ?, ?, ?, ?)`;
        const [reuslt] = await connection.execute(statement, [filename, mimetype, size, userId, goodsId]);
        return reuslt;
    }
    async getFileInfoByFileName(fileName) {
        const statement = `select * from file where fileName = ?`;
        const [result] = await connection.execute(statement, [fileName]);
        return result[0];
    }
    async getList() {
        const statement = `select * from users`;
        const [result] = await connection.execute(statement);
        return result;
    }
}

module.exports = new FileService(); 