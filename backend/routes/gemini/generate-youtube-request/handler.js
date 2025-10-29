const { generateText } = require('../../../services/gemini');

module.exports = async function (request, reply) {
    // 從回應中提取文字內容
    const response = await generateText(request.body.prompt);

    // 回傳成功結果
    return reply.status(200).send({
        response: response.content,
    });
};
