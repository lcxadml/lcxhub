const Router = require('koa-router');
const { login } = require('../controller/auth.controller')
const { verifyLogin } = require('../middleware/auth.middleware')

const authRouter = new Router();


authRouter.post('/login', verifyLogin, login);
authRouter.options('/login', async(ctx, next) => {
    ctx.response.status = 200;
    ctx.body = {
        message: 'ok',
        code: '0'
    }
})

module.exports = authRouter;
