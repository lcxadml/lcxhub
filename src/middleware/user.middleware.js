const errorType = require('../constants/error_types');
const { getUserByName } = require('../service/user.service');
const md5password = require('../utils/password-handler')
const veryifyUser = async(ctx, next) => {
    // 获取用户名和密码
    const { name, pwd } = ctx.request.body;
    // 1 判断用户名和密码不为空
        if(!name || !pwd) {
            const error = new Error(errorType.NAME_PASSWORD_IS_REQUIRE);
            return ctx.app.emit('error',error, ctx);
        }
    // 2 判断用户名没有注册过
    
       const result =await getUserByName(name);
       if(result.length !== 0) {
           const error = new Error(errorType.NAME_HAS_BEEN_REGISTER)
           return ctx.app.emit('error', error, ctx);
       }
    await next();
}
const handlerPassword =async (ctx, next) => {
    let { pwd } = ctx.request.body;
    ctx.request.body.pwd = md5password(pwd);
    await next();
}
module.exports = {
    veryifyUser,
    handlerPassword
}