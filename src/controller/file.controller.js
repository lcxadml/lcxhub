const { saveAvatar, createFile } = require('../service/file.service')
const { updataAvatarUrlById } = require('../service/user.service')
const { APP_HOST, APP_PORT } = require('../app/config')

class FileController {
    async saveAvatarInfo (ctx, next) {
        const {mimetype,filename, size } = ctx.req.file;
        const { id } = ctx.user;
        // 将图像信息保存到我们的数据库中
        const result = await saveAvatar(filename, mimetype, size, id );
        // 将图片地址保存在user中
        const avatar_url = `${APP_HOST}:${APP_PORT}/users/${id}/avatar`;
        const updateResult = await updataAvatarUrlById(avatar_url, id);
        ctx.body = updateResult;
    }
    async savePictureInfo(ctx, next) {
        console.log(111111);
        const files = ctx.req.files;
        const { id } = ctx.user;
        const { goodsId } = ctx.query;
        // 将所有的文件信息保存到数据库中
        for(let file of files) {
            const {mimetype,filename, size } = file;
            await createFile(filename, mimetype, size, id, goodsId);
        }
        console.log('动态上传成功！');
        ctx.body = "动态上传完成~"
    }
}

module.exports = new FileController();