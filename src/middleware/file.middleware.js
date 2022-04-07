const Multer = require('koa-multer')
const Jimp = require('jimp')
const path = require('path')
const { AVATAR_PATH, PICTURE_PATH } = require('../constants/file-path')

const avatarUpload = Multer({
    dest: AVATAR_PATH
});
const avatarHandler = avatarUpload.single('avatar');
const picutreUpload = Multer({
    dest: PICTURE_PATH
});
const pictureHandler = picutreUpload.array('picture', 9);
const pictureResize = async (ctx, next) => {

    // 获取所有图像信息
    const files = ctx.req.files;
   
    for(let file of files) {
        Jimp.read(file.path).then(image => {
            const destPath = path.join(file.destination, file.filename)
            image.resize(1280,Jimp.AUTO).write(`${destPath}-large`);
            image.resize(640,Jimp.AUTO).write(`${destPath}-middle`);
            image.resize(320,Jimp.AUTO).write(`${destPath}-small`);
        });
    }
    await next();
}
module.exports = {
    avatarHandler,
    pictureHandler,
    pictureResize,
};