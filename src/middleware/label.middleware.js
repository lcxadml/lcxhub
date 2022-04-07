const { getLabelByName, create } = require('../service/label.service')

const verifyLabelIsExist = async (ctx, next) => {
    // 1. 取出要添加的所有标签
    const { labels } = ctx. request.body;
    const newLabels = [];
    for(let item of labels) {
        const labelRsult = await getLabelByName(item);
        const label = { name: item };
        if(!labelRsult) {
            // 创建标签数据
            const result = await create(item);
            label.id = result.insertId;
        } else {
            label.id = labelRsult.id;
        }
        newLabels.push(label);
    }
    ctx.labels = newLabels;
    await next();
}

module.exports = {
    verifyLabelIsExist
}