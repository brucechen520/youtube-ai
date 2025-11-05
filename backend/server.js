import schema from './lib/schemas/index.js';
import routes from './routes/index.js';

export default async function (fastify) {
	schema(fastify);

	fastify.register(routes, { prefix: '/api/v1/' });

	return fastify;
};
