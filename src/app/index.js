const Koa = require('koa');
const userRouter = require('../router/user.router');
const authRouter = require('../router/auth.router');
const bodyParser = require('koa-bodyparser');
const errorHandler = require('./error.handle');
const { setCors } = require('../middleware/cors')
const useRoutes = require('../router')
const app = new Koa();
app.useRoutes = useRoutes;
app.use(bodyParser());
app.use(setCors);
// app.use(userRouter.routes());
// app.use(userRouter.allowedMethods());
// app.use(authRouter.routes());
// app.use(authRouter.allowedMethods());
app.useRoutes()
app.on('error', errorHandler);
module.exports = app; 