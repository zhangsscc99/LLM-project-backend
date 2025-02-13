class UserController {
    //用户登录
    async wxLogin(ctx){
        const {name, age} = ctx.request.body;
        console.log(name);
        console.log(age);
        ctx.send([1, 2, 3]);
        // (ctx.body = {
        //     msg: 'success',
        // }),
        //     (ctx.status = 200);
        
    }
}
module.exports = new UserController();