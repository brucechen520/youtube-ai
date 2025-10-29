module.exports = function (error, request, reply) {
    if (error.validation) {
        error.statusCode = 422;
    }

    reply.error = error;

    reply.send(error);
};
