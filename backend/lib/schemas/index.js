import YoutbueSchema from './youtube.js';
import CommonSchema from './common.js';
import ErrorSchema from './error.js';

export default function (fastify) {
	fastify.addSchema(YoutbueSchema);
	fastify.addSchema(CommonSchema);
	fastify.addSchema(ErrorSchema);
};
