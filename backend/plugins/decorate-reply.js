// backend/plugins/decorate-reply.js
const fp = require('fastify-plugin');

module.exports = fp(async function (fastify, opts) {

	// 1. 裝飾 reply 物件，將初始值設為 null (非物件參考型別)
	if (!fastify.hasReplyDecorator('locals')) {
		fastify.decorateReply('locals', null); // 避免 FST_ERR_DEC_REFERENCE_TYPE
	}

	// 2. 在 preHandler Hook 中，為每個請求實例初始化獨立的物件
	fastify.addHook('preHandler', async (request, reply) => {
		reply.locals = {}; // 確保每個請求都有一個獨立的 locals {}

		// 塞入資料...
		reply.locals.requestTime = Date.now();
	});
});