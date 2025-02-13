const OpenAI = require('openai');
const {apiKey} = require("@/config/default").aliyun 
const openai = new OpenAI(
    {
        apiKey,
        baseURL: "https://dashscope.aliyuncs.com/compatible-mode/v1"

    }
);

class ChatController {
    //对话， 流式输出
    async chatMessage(ctx){
        const completion = await openai.chat.completions.create({
            model: "qwen-plus",
            messages: [
                { role: "user", content: "你是谁？" }
            ], 
    });
    console.log(JSON.stringify(completion));
    }
}
module.exports = new ChatController();