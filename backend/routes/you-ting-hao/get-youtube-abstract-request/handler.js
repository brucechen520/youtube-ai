import { generateYouTingHaoStructuredJson } from '../../../services/gemini.js';

export default async function (request, reply) {
	// 從回應中提取文字內容
	const response = await generateYouTingHaoStructuredJson(request.body.prompt, { transcript: reply.locals.transcript});

	console.log('-> 游廷皓的財經號角結構化文字生成結果：', response.content);

	// 回傳成功結果
	return reply.status(200).send({
		response: response.content,
	});
};
