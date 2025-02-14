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
    let functionName = ''//函数名称
    let requireParameters = ''//函数参数

    // console.log(JSON.stringify(completion));
    // 迭代
    for await (const chunk of completion) {
        // console.log(JSON.stringify(chunk));
        const str = JSON.stringify(chunk);
        const obj = JSON.parse(str);
        //判断是否可以调用函数 工具 
        // console.log(str);
        const choices = obj.choices[0].delta;
        if (choices.content === null && choices.tool_calls){
            console.log('用工具调用-----');
            if (messages[messages.length - 1].role !== 'assistant'){
                messages.push({"role": "assistant", "content": "", tool_calls:[]})
                var lastMessage = messages[messages.length - 1];
            }
            // 模型回复的要调用的工具和调用工具时需要的参数取出来
            const toolCalls = choices.tool_calls 
            if (toolCalls.length > 0){
                if (lastMessage.tool_calls.length <= 0){
                    functionName = toolCalls[0].function.name
                    lastMessage.tool_calls.push(toolCalls[0])
                }
            }
            // 遍历取出函数参数
            toolCalls.forEach(item=>{
                if (item.function.arguments){
                    requireParameters = item.function.arguments;
                }
                lastMessage.tool_calls[0].function.arguments = requireParameters;
            })
            console.log(functionName);
            console.log(requireParameters);
            console.log(messages);
            // 调用工具
            // const result = await tools[functionName](requireParameters)
            // console.log(result);

            // 等遍历完毕把工具调用的结果传给前端
            if (choices)


        }
    }
}



}
module.exports = new ChatController();