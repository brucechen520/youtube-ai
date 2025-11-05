import 'dotenv/config';
import config from 'config';
import Fastify from 'fastify';
import { pinoLogger } from '../utils/pino/index.js';
import ajvKeywords from 'ajv-keywords';
import errorHandlerPlugin from '../backend/plugins/error-hander.js';
import decorateReplyPlugin from '../backend/plugins/decorate-reply.js';
import serverSartup from '../backend/server.js';

// 初始化 Fastify 伺服器
const fastify = Fastify({
	bodyLimit: config.fastify.bodyLimit,
	trustProxy: true,
	loggerInstance: pinoLogger(config.pino),
	disableRequestLogging: true,
	requestIdLogLabel: 'requestId',
	requestIdHeader: 'x-request-id',
	ajv: {
		plugins: [
			[ajvKeywords, ['uniqueItemProperties', 'transform']],
		],
	},
});

fastify.setErrorHandler(errorHandlerPlugin);
fastify.register(decorateReplyPlugin);

// ----------------------------------------------------------
// 啟動伺服器
// ----------------------------------------------------------
const start = async () => {
	try {
		serverSartup(fastify);

		await fastify.listen({ port: 3000 });
		console.log(`🚀 Fastify server running at http://localhost:3000`);
	} catch (err) {
		fastify.log.error(err);
		process.exit(1);
	}
};

start();