
const connection = require('../app/database')
class CommentService {
    async create(comment) {
        const statement = `INSERT INTO comment (content, goods_id, user_id, comment_id) VALUES (?, ?, ?, ?)`;
        const [result] = await connection.execute(statement,
             [comment['content'], comment['goods_id'], comment['user_id'],comment['comment_id']]);
        return result;
    }
    async remove(id) {
        const statement = `delete from comment where id = ?`;
        const  [result] = await connection.execute(statement, [id]);
        return result;
    }
    async getCommentList(goodsId) {
        const statemnet = `SELECT * FROM comment where goods_id = ?`;
        const [result] = await connection.execute(statemnet, [goodsId]);
        return result;
    }
}

module.exports = new CommentService()