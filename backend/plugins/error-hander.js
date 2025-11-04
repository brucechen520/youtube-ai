module.exports = function (error, request, reply) {
	if (error.validation) {
		error.statusCode = 422;
	}

	request.log.error(error);

	reply.error = error;

	reply.send(error);
};
