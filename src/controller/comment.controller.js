
const { create, remove, getCommentList } = require('../service/comment.service')
class CommentController {
    async create(ctx, next) {
        const comment = ctx.request.body;
        const result = await create(comment);
        ctx.body = result
    }
    async remove(ctx, next) {
        const { commentId } = ctx.params;
        const result = await remove(commentId);
        ctx.body = result;
    }
    async getCommentList(ctx, next) {
        const { goodsId } = ctx.query;
        const result = await getCommentList(goodsId);
        ctx.body = result;
    }
}

module.exports = new CommentController();