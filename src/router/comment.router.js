const Router = require('koa-router');
const { verifyAuth, verifyPermission } = require('../middleware/auth.middleware');
const { create, remove, getCommentList } = require('../controller/comment.controller')
const commentRouter = new Router({prefix: '/comment'});
commentRouter.post('/', verifyAuth, create);
commentRouter.delete('/:commentId', verifyAuth, verifyPermission('comment'), remove);
// 获取评论列表
commentRouter.get('/',verifyAuth, getCommentList)
module.exports = commentRouter;