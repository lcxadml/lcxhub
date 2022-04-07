const jwt = require('jsonwebtoken');

const errorType = require('../constants/error_types');
const { getUserByName } = require('../service/user.service');
const { checkResource } = require('../service/auth.service')
const md5password = require('../utils/password-handler')
const { PUBLIC_KEY } = require('../app/config')
const verifyLogin = async(ctx, next) => {
    // 获取用户名和密码
    const { name, pwd } = ctx.request.body;
    // 1. 判断用户名和密码是否为空
    if(!name || !pwd) {
        const error = new Error(errorType.NAME_PASSWORD_IS_REQUIRE);
        return ctx.app.emit('error',error, ctx);
    }
    // 2. 判断用户是否存在
    const result =await getUserByName(name);
    if(result.length === 0) {
        const error = new Error(errorType.NAME_NOT_EXIST)
        return ctx.app.emit('error', error, ctx);
    }
    // 3. 验证数据库中是否用户名和密码
    const password = md5password(pwd);
    if(result[0].password !== password) {
        const error = new Error(errorType.PASSWORD_ERROR)
        return ctx.app.emit('error', error, ctx);
    }
    ctx.user = result[0];
    await next();
}
const verifyAuth = async(ctx, next) => {
    console.log('验证授权的middleware~');
    // 1 获取token
    // 2 验证token
    let result;
    try {
        const authorization = ctx.headers.authorization;
        const token = authorization.replace('Bearer ', '');
        result = jwt.verify(token, PUBLIC_KEY, {
            algorithms: ['RS256']
        });
        ctx.user = result;
        await next();
    } catch (error) {
        console.log(error);
        const err = new Error(errorType.UNAUTHNAZITION);
        ctx.app.emit('error', err, ctx);
    }
}
const verifyPermissionComment = async (ctx, next) => {
    const userId = ctx.user.id;
    const { id } = ctx.user;
    console.log(userId, id);
    if(parseInt(id) === parseInt(userId)) {
        await next();
    } else {
        const err = new Error(errorType.User_ID_IS_ERROR);
        ctx.app.emit('error', err, ctx);
    }
}
const verifyPermission = (tableName) => {
    return async (ctx, next) => {
        const userId = ctx.user.id;
        const tag = tableName + 'Id';
        const id = ctx.params[tag];
        const isPermssion = await checkResource(tableName, id, userId );
        console.log(isPermssion);
        if(!isPermssion) {
            const error = new Error(errorType.COMMENT_IS_NOT_BELLOW);
            ctx.app.emit('error', error, ctx);
        } else {
            await next();
        }
        
    }
}
module.exports = {
    verifyLogin,
    verifyAuth,
    verifyPermissionComment,
    verifyPermission
}