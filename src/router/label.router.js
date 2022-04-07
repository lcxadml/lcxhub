const Router = require('koa-router');
const { verifyAuth } = require('../middleware/auth.middleware')
const { create, getLabelList } = require('../controller/label.controller')
const labelRouter = new Router({ prefix: '/label' });

labelRouter.post('/', verifyAuth, create )
labelRouter.get('/list', getLabelList);
module.exports = labelRouter;