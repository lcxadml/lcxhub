const Router = require('koa-router');
const { avatarInfo, getList } = require('../controller/user.controller')
const  {
    create
} = require('../controller/user.controller');
const { veryifyUser, handlerPassword } = require('../middleware/user.middleware')
const userRouter = new Router({prefix: '/users'});

userRouter.post('/', veryifyUser, handlerPassword, create)

userRouter.get('/:userId/avatar', avatarInfo)

userRouter.get('/', getList);

module.exports =  userRouter;