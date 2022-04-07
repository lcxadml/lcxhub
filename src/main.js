const fs = require('fs');
const path = require('path');
const app = require('./app');
const https = require('https');
const http = require('http');
const { APP_PORT }  = require('./app/config');
const options = {
    cert: fs.readFileSync(path.resolve(__dirname, './httpskeys/lcxhub.shop_chain.crt')),
    key: fs.readFileSync(path.resolve(__dirname, './httpskeys/lcxhub.shop_key.key')),
}

// 创建https服务实例
const httpsServer = https.createServer(options, app.callback());
const httpServer = http.createServer(app.callback());
const SSLPORT = 8000;
require('./app/database');

httpsServer.listen(SSLPORT, () => {
    console.log(`服务器${SSLPORT}启动成功~`);
})


httpServer.listen(APP_PORT, () => {
    console.log('服务器'+APP_PORT+'启动成功~');
})