const logger = require('@/loggerMiddleware');


// 错误处理中间件
const errorHandler = async (ctx, next) => {
    try {
        await next();
        logger.info('输出日志：${ctx.method} ${ctx.url}')
    } catch (errorData) {
        logger.error(errorData);
        console.log('捕获到错误');
        // 接收参数校验的错误
        if(errorData.code){
            const {code, msg} = errorData;
            ctx.send(null, code, msg);
        } else {
            console.log(errorData);
            const error = errorData.message || '异常错误，请查看服务器端日志';
            const status = errorData.status || errorData.statusCode || 500;
            ctx.send(null, status, '服务器端异常错误', error);
        

        }
        
    }

}
module.exports = errorHandler;
