
const connect = require('../app/database')

class LabelService {
    async create(name) {
        const statement = `INSERT INTO label(name) VALUES(?)`;
        const [result] = await connect.execute(statement, [name]);
        return result;
    }
    async getLabelByName(name) {
        const statement = `select * from label where name = ?`;
        const [result] = await connect.execute(statement, [name]);
        return result[0];
    }
    async getLabelList(goodsId, offset, limit) {
        const statement = `select 
            json_object('labelName', l.name, 'id', l.id)
             labels from goods_label gl LEFT JOIN label l on gl.label_id = l.id
            where goods_id = ? LIMIT ?, ?`;
        const [result] = await connect.execute(statement, [goodsId, offset, limit]);
        return result;
    }
}

module.exports = new LabelService;