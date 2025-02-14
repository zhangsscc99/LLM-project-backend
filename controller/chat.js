const OpenAI = require('openai');
const {apiKey, systemContent} = require("@/config/default").aliyun 
const Validate = require("@/validate/index")
const tools = require("@/config/tools")
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
        let messages = [
            { role: "system", 
              content: systemContent,
            },
            ...chatMessage,
        ]
        const completion = await openai.chat.completions.create({
            model: "qwen-plus",
            messages,
            // messages: [
            //     { role: "system", content: systemContent },
            //     ...chatMessage,
            // ], 
            stream: true,
            tools,
    });
    // console.log(JSON.stringify(completion));
    // 迭代
    for await (const chunk of completion) {
        // console.log(JSON.stringify(chunk));
        const str = JSON.stringify(chunk);
        const obj = JSON.parse(str);
        //判断是否可以调用函数 工具 
        console.log(obj);
        const choices = obj.choices[0].delta;
        if (choices.content === null && choices.tool_calls){
            console.log('用工具调用-----');
            if (messages[messages.length - 1].role !== 'assistant'){
                messages.push({"role": "user", "content": "", tool_calls:[]})
                const lastMessage = messages[messages.length - 1];
            }
            // 模型回复的要调用的工具和调用工具时需要的参数取出来
            


        }
    }
}



}
module.exports = new ChatController();