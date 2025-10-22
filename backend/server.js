module.exports = async function (fastify) {
	require('./lib/schemas')(fastify);

	fastify.register(require('./routes/index'), { prefix: '/api/v1/' });

	return fastify;
};
