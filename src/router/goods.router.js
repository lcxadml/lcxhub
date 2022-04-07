const Router = require('koa-router');
const { verifyAuth, verifyPermissionComment,
         verifyPermission } = require('../middleware/auth.middleware');
const { verifyLabelIsExist } = require('../middleware/label.middleware');
const { create, detail, list,
         getListByUserId, changeGoods, deleteGoods,
         addLabels, fileInfo } = require('../controller/goods.controller');


const goodsRouter = new Router();
goodsRouter.post('/goods', verifyAuth, create);
goodsRouter.get('/goods/detail/:goodsId', detail);
goodsRouter.get('/goods', list);
goodsRouter.get('/goods/list', verifyAuth, getListByUserId);
goodsRouter.patch('/goods', verifyAuth, verifyPermissionComment, changeGoods);
goodsRouter.delete('/goods/:id/:userId', verifyAuth, verifyPermissionComment, deleteGoods );
goodsRouter.post('/goods/:goodsId/labels', verifyAuth, verifyPermission('goods'), verifyLabelIsExist, addLabels)
goodsRouter.get('/goods/images/:filename', fileInfo)
module.exports = goodsRouter;