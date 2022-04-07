const fs = require('fs');

function useRoutes() {
    fs.readdirSync(__dirname).forEach(file => {
        if(file === 'index.js') return;
        const router = require(`./${file}`);
        this.use(router.routes());
        this.use(router.allowedMethods());
    })
}

module.exports = useRoutes;