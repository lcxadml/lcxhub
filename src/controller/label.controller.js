const { create, getLabelList } = require('../service/label.service.js')  

class LabelRouter {
    async create(ctx, next) {
        const {name} = ctx.request.body;
        ctx.body = await create(name);
    }
    async getLabelList(ctx, next) {
        const { goodsId, offset, limit } = ctx.query;
        const result = await getLabelList(goodsId, offset, limit);
        console.log(result);
        ctx.body = result;
    }
}

module.exports = new LabelRouter();