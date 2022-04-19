const connection = require('../app/database')
const { INSERT_GOODS_FAIL } = require('../constants/error_types')
class GoodsService {
    async create({ price, name, des, classify, userId, count }, ctx) {
        const statment = `INSERT INTO goods (price, name, des, classify, user_id, count) 
                            VALUES (?,?,?,?,?, ?)`;

        try {
            const [result] =await connection.execute(statment, [price, name, des, classify, userId, count]);
            return result;
        } catch (error) {
            const err = new Error(INSERT_GOODS_FAIL);
            ctx.app.emit('error', err, ctx);
        }
    };
    async detailService (id) {
        const statment = `SELECT 
        g.id id, g.price, g.des, g.CreateAt createTime, g.updateAt updateTime, g.name name, g.count count,
        JSON_OBJECT('id',u.id, 'name', u.name) user,
        (select json_arrayagg(CONCAT('http://120.25.250.241:8888/goods/images/', file.filename)) from file where g.id = file.goods_id) images
         from goods g 
        LEFT JOIN users u ON g.user_id = u.id WHERE g.id = ?`;
        const [result] = await connection.execute(statment, [id]);
        
        return result[0];
    }
    async listService(offset, size) {
        const statement = `SELECT 
        g.id id, g.price, g.des, g.CreateAt createTime, g.updateAt updateTime, g.name name, g.count count,
        JSON_OBJECT('id',u.id, 'name', u.name, 'avatarUrl', u.avatar_url) user, (SELECT COUNT(*) from comment c where c.goods_id = g.id) commentCount,
        (select json_arrayagg(CONCAT('http://120.25.250.241:8888/goods/images/', file.filename)) from file where g.id = file.goods_id) images
         from goods g 
        LEFT JOIN users u ON g.user_id = u.id LIMIT ?, ?`;
        const [result] = await connection.execute(statement, [offset, size]);
        return result;
    }
    async getListByUserIdService(userId) {
        const statement = `SELECT *,
        (select json_arrayagg(CONCAT('http://120.25.250.241:8888/goods/images/', file.filename)) 
        from file where g.id = file.goods_id) images
         FROM goods g WHERE user_id = ${userId}`;
        const [result] = await connection.execute(statement, [userId]);
        return result;
    }
    async updateGoods ({id, name,des, price, classify, count}) {
        price = String(price).replace('￥', '');
        console.log(id, name,des, price, classify, count);
        const statement = `UPDATE goods SET name=?, price=?, des=?, classify=?, count=? where id=?`;
        const [result] = await connection.execute(statement, [name, price, des, classify, count, id]);
        return result;
    }
    async deleteGoods(id) {
        const statement = `delete FROM goods where id = ?`;
        const result = await connection.execute(statement, [id]);
        return result;
    }
    async hasLabel (goodsId, labelId) {
        console.log(goodsId, labelId);
        const statement = `select * from goods_label where goods_id = ? and label_id = ?`;
        const [result] = await connection.execute(statement, [goodsId, labelId]);
        return result[0] ? true : false;
    }
    async addLabel(goodsId, labelId) {
        const statement = `INSERT INTO goods_label(goods_id, label_id) VALUES(?, ?)`;
        const [result] = await connection.execute(statement, [goodsId, labelId]);
        return result; 
    }
}

module.exports = new GoodsService();