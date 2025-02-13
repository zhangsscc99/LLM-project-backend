const Koa = require('koa')
const app = new Koa()
const json = require('koa-json')//将http响应的数据转换为json格式
const bodyParser = require('koa-bodyparser')//将http请求的数据转换为json格式 解析http请求的消息体
const cors = require('@koa/cors')//跨域
const {addAliases} = require("module-alias") // 别名
addAliases({
    "@":__dirname, 
})
const router = require('@/router')
const responseHandler = require('@/config/result')



app.use(json());
app.use(bodyParser());
app.use(cors());
app.use(responseHandler);
app.use(router.routes()).use(router.allowedMethods());//路由注册到中间件

app.listen(7000);
console.log('7000端口已启动!!');


