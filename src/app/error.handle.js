const errorTypes = require('../constants/error_types')

const errorandler = (err, ctx) => {
    let status, message;
    switch(err.message) {
        case errorTypes.NAME_PASSWORD_IS_REQUIRE:
            status = 200; // Bad request
            message = "用户名或者密码不能为空~";
            result = false;
            break;
        case errorTypes.NAME_HAS_BEEN_REGISTER:
            status = 200; // Bad request
            message = "用户名已经被注册~";
            result = false;
            break;
        case errorTypes.NAME_NOT_EXIST:
            status = 200; // Bad request
            message = "用户不存在~";
            result = false;
            break;
        case errorTypes.PASSWORD_ERROR:
            status = 200; // Bad request
            message = "密码错误";
            result = false;
            break;
        case errorTypes.UNAUTHNAZITION:
            status = 200; // Bad request
            message = "未授权token，请重新登录";
            result = false;
            break;
        case errorTypes.INSERT_GOODS_FAIL:
            status = 200; // Bad request
            message = "新加商品失败，请重新尝试";
            result = false;
            break;
        case errorTypes.User_ID_IS_ERROR:
            status = 200; // Bad request
            message = "只能修改您自己的商品哦~";
            result = false;
            break;
        case errorTypes.COMMENT_IS_NOT_BELLOW:
            status = 200; // Bad request
            message = "只能删除自己的评论哦~";
            result = false;
            break;
        default:
            status = 404; // Bad request
            message = "not found~";
            result = false;
    }
    ctx.status = status;
    ctx.body = {
        status,
        message,
        result,
    };
}

module.exports = errorandler;