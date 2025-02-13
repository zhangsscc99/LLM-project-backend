// 统一接口响应数据格式：中间件
const responseHandler = async (ctx, next) => {
    ctx.send = (data = null, code = 200, msg = 'success', error = null, serviceCode = 200) => {
        ctx.body = {
            data,// 响应数据 传给前端的数据
            msg,// 提示信息
            error,// 错误信息
            serviceCode, // 业务状态码
        }
        ctx.status = code;
    }
    await next();
}
module.exports = responseHandler;
