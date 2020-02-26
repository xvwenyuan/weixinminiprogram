const Koa = require('koa');//导入一个class
const data = require('./data');
// 注意require('koa-router')返回的是函数:
const router = require('koa-router')();
const bodyParser = require('koa-bodyparser');
const { findUserData, addUserData } = require('./mysql');
const axios = require('axios');
var cors = require('koa2-cors');
const app = new Koa();//创建一个koa对象
app.use(bodyParser());
app.use(cors({
    origin: function (ctx) {
        return '*';
    },
    maxAge: 5,
    credentials: true,
    allowMethods: ['GET', 'POST', 'DELETE'],
    allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
}));
// log request URL:
// 对于任何请求，app将调用该异步函数处理请求
app.use(async (ctx, next) => {
    console.log(`Process ${ctx.request.method} ${ctx.request.url}...`);
    await next();
});

// add url-route:
router.get('/hello/:name', async (ctx, next) => {
    var name = ctx.params.name;
    try {
        let res = await findUserData(name);
        // res = await Promise.all([findUserData(name), addUserData(name)])
        res = JSON.parse(JSON.stringify(res))[0];
        // ctx.response.body = `<h1>email, ${res.email}!</h1><h1>registerdate, ${res.registerdate}!</h1>`;
        ctx.response.body = JSON.stringify(res);
    } catch{

    }

});

// add url-route:
router.get('/json', async (ctx, next) => {
    const json = { 1: 2, 3: 4 };
    ctx.response.body = JSON.stringify(json);
});

// add url-route:
// router.post('/hello/:name', async (ctx, next) => {
//     var name = ctx.params.name;
//     const hello = ctx.query.hello;
//     ctx.response.body = `<h1>Hello, ${name}!</h1><h1>Hello, ${hello}!</h1>`;
// });

router.get('/login', async (ctx, next) => {
    var jsCode = ctx.query.jsCode;
    const res = await axios({
        method: 'get',
        url: 'https://api.weixin.qq.com/sns/jscode2session',
        params: {
            appid: 'wx048d589b5ce0e86a',
            secret: '14ebcac52b6fe02e3b7a98a07f366f8a',
            js_code: jsCode,
            grant_type: 'authorization_code'
        }
    })
    ctx.response.body = `{code: 60000, openid: ${res.data.openid}}`;
});
// add router middleware:
app.use(router.routes());

app.listen(3000);//3000端口监听
console.log('app started at port 3000...');
data.data.forEach(item => {
    addUserData([item.goods_id, item.goods_name, item.group_price, item.hd_thumb_url, item.hd_url,item.good_points])
})
