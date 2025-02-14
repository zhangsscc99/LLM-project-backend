const OpenAI = require('openai');
const {apiKey, systemContent} = require("@/config/default").aliyun 
const Validate = require("@/validate/index")
const openai = new OpenAI(
    {
        apiKey: "sk-18fcc076d5d746fea3c922d20aef7364",
        baseURL: "https://dashscope.aliyuncs.com/compatible-mode/v1"

    }
);

class ChatController {
    //对话， 流式输出
    
    async chatMessage(ctx){
        const { chatMessage } = ctx.request.body
        // 校验
        await Validate.isarrayCheck(chatMessage, 'chatMessage字段不能为空', 'chatMessage');
        const completion = await openai.chat.completions.create({
            model: "qwen-plus",
            messages: [
                { role: "system", content: systemContent },
                ...chatMessage
            ], 
            stream: true,
    });
    // console.log(JSON.stringify(completion));
    // 迭代
    for await (const chunk of completion) {
        console.log(JSON.stringify(chunk));
    }
}



}
module.exports = new ChatController();