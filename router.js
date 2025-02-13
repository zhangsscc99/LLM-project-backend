const Router = require('@koa/router');//路由
const router = new Router();
//   用户相关的
const user = require('@/controller/user')



// 对话
const chat = require('@/controller/chat')
// 对话接口
router.post('/chatMessage', chat.chatMessage);




//登录接口
router.post('/wxlogin', user.wxLogin);

module.exports = router;

