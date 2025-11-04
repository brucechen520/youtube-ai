const config = require('config');

require('dotenv').config();

// 初始化 Fastify 伺服器
const fastify = require('fastify')({
    bodyLimit: config.fastify.bodyLimit,
    trustProxy: true,
    loggerInstance: require('../utils/pino')(config.pino),
    disableRequestLogging: true,
    requestIdLogLabel: 'requestId',
    requestIdHeader: 'x-request-id',
    ajv: {
        plugins: [
            [require('ajv-keywords'), ['uniqueItemProperties', 'transform']],
        ],
    },
});

fastify.setErrorHandler(require('../backend/plugins/error-hander'));
fastify.register(require('../backend/plugins/decorate-reply'));

// ----------------------------------------------------------
// 啟動伺服器
// ----------------------------------------------------------
const start = async () => {
    try {
        require('../backend/server')(fastify);

        await fastify.listen({ port: 3000 });
        console.log(`🚀 Fastify server running at http://localhost:3000`);
    } catch (err) {
        fastify.log.error(err);
        process.exit(1);
    }
};

start();