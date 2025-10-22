module.exports = function (fastify, options, done) {
	// Add RESTful API step1 : add routes with schema and handler
	// Youtube request
	fastify.post('/youtubes/generate', require('./youtubes/generate-youtube-request'));

	done();
};
