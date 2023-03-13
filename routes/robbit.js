const router = require("koa-router")();
const openai = require("openai");
openai.apiKey = "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";

router.get("/getText", async (ctx, next) => {
    console.log(1111, openai.completions);
    const model = "davinci"; // 选择你需要的模型
    const prompt = "Hello, OpenAI!"; // 输入你的文本
    const completions = await openai.completions.create({
        engine: model,
        prompt: prompt,
        maxTokens: 5,
    });

    const message = completions.choices[0].text;
    // console.log(message); // 输出预测的文本
});

router.post("/testOpenai", async (ctx, next) => {
    console.log(111);
    // const { model, prompt } = ctx.request.body;
    // const response = await openai.createImage({
    //     model,
    //     prompt,
    //     max_tokens: 2018,
    //     temperature: 0.5,
    // });
    // console.log(response);
    const prompt = "Please generate an image of a cat.";
    const engine = "image";
    openai.Completion.create({
        prompt: prompt,
        engine: engine,
        maxTokens: 1024,
        n: 1,
        stop: "\n",
    })
        .then(function (response) {
            const imageUrl = response.choices[0].text.trim();
            console.log(imageUrl);
        })
        .catch(function (error) {
            console.log(error);
        });

    // ctx.body = response.data.completions;
});

module.exports = router;
