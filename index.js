const Koa = require('koa');
const Router = require('koa-router');
const mockList = require('./mock/index');

const app = new Koa();
const router = new Router();

async function getRes(fn, ctx) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            try {
                const res = fn(ctx); // 将 ctx 传递给 response
                resolve(res);
            } catch (error) {
                reject(error);
            }
        }, 500); // 调整延迟时间
    });
}

// 注册路由
mockList.forEach((item) => {
    const { url, method, response } = item;
    router[method](url, async (ctx) => {
        try {
            const res = await getRes(response, ctx); // 传递 ctx
            ctx.body = res;
        } catch (error) {
            console.error('Error in mock response:', error);
            ctx.status = 500;
            ctx.body = { error: 'Internal Server Error', message: error.message };
        }
    });
});

app.use(router.routes());
app.listen(3001, () => {
    console.log('Mock server is running at http://localhost:3001');
});
