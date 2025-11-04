module.exports = function (fastify, options, done) {
	// Add RESTful API step1 : add routes with schema and handler
	// Gemini request
	fastify.post('/gemini/ask', require('./gemini/ask-gemini-request'));
	fastify.post('/you-ting-hao/abstract', require('./you-ting-hao/get-youtube-abstract-request'));

	done();
};
