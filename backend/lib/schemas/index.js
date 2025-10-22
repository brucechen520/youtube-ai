module.exports = function (fastify) {
	fastify.addSchema(require('./youtube'));
	fastify.addSchema(require('./common'));
	fastify.addSchema(require('./error'));
};
