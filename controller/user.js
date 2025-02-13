class UserController {
    //用户登录
    async wxLogin(ctx){
        const {name, age} = ctx.request.body;
        console.log(name);
        console.log(age);
    }
}
module.exports = new UserController();