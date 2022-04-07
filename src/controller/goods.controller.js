const fs = require('fs');

const { create, 
    detailService, 
    listService,
    getListByUserIdService,
    updateGoods,
    deleteGoods,
    hasLabel,
    addLabel
 } = require('../service/goods.service');
 const { getFileInfoByFileName } = require('../service/file.service')
const { PICTURE_PATH } = require('../constants/file-path');
class GoodsController {
    async create(ctx, next) {
        // 获取 （user_id）
        const { price, name, des, classify, count } = ctx.request.body;
        console.log(price, name, des, classify, count);
        const userId =  ctx.user.id;
        // 将数据插入到数据库里面
        const result = await create({ price, name, des, classify, userId, count }, ctx)
        ctx.body = result;
    }
    async detail(ctx, next) {
        const goodsId = ctx.params.goodsId;
        const result =await detailService(goodsId);
        ctx.body = result;
    }
    async list (ctx, next) {
        const { offset, size } = ctx.query;
        const result = await listService(offset, size);
        ctx.body = result
    }
    async getListByUserId (ctx, next) {
        const { id } = ctx.user;
        const result = await getListByUserIdService(id);
        ctx.body = result;
    }
    async changeGoods(ctx, next) {
        const { name, price, des, count, classify, id } = ctx.request.body;
        const reuslt = await updateGoods({ name, price, des, count, classify, id });
        ctx.body = reuslt
    }
    async deleteGoods(ctx, next) {
        const { id } = ctx.params;
        const [result] = await deleteGoods(id);
        ctx.body = result;
    }
    async addLabels(ctx, next) {
        // 1. 获取标签和动态id
        const { goodsId } = ctx.params;
        const labels = ctx.labels;
        // 2. 添加所有标签
        for(let label of labels) {
            //  判断标签是否和商品有关系了
            const isExist = await hasLabel(goodsId, label.id);
            if(!isExist) {
                const result = await addLabel(goodsId, label.id);
            }
        }
        ctx.body = '添加标签成功！'
    }
    async fileInfo(ctx, next){
        const { filename } = ctx.params;
        const result = await getFileInfoByFileName(filename);
        console.log(result.mimetype);
        ctx.response.set('content-type', result.mimetype);
        ctx.body = fs.createReadStream(`${PICTURE_PATH}/${filename}`);
    }
}

module.exports = new GoodsController();