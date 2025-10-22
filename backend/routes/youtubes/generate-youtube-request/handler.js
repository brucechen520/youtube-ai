const { generateAIContent } = require('../../../services/youtube');

module.exports = async function (request, reply) {
    // 從回應中提取文字內容
    const response = await generateAIContent(request.body.prompt);

    // 回傳成功結果
    return reply.status(201).send({
        response: response.content,
    });
};
