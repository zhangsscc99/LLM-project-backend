const Validate = require('@/validate/index');
class UserController {
    //用户登录
    async wxLogin(ctx){
        const {name, age} = ctx.request.body;
        console.log(name);
        await Validate.nullCheck(name, '请填写姓名', 'name');
        await Validate.nullCheck(age, '请填写年龄', 'age');
        console.log(name);
        console.log(age);
        ctx.send([1, 2, 3], 400);
    }
}
module.exports = new UserController();