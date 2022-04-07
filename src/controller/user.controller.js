const fs = require('fs');
const service = require('../service/user.service');
const fileService = require('../service/file.service');
const { AVATAR_PATH } = require('../constants/file-path')
class UserController {
    async create(ctx) {
        const user = ctx.request.body;
        const result = await service.create(user);
        ctx.body = result;
    }
    async avatarInfo(ctx, next) {
        const {userId} = ctx.params;
        const result = await fileService.getAvatarByUserId(userId);
        ctx.response.set('content-type', result.mimetype);
        // 提供图像信息
        ctx.body = fs.createReadStream(`${AVATAR_PATH}/${result.filename}`);
    }
}

module.exports = new UserController();