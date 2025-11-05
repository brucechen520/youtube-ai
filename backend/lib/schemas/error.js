export default {
	$id: 'error',
	type: 'object',
	properties: {
		error: {
			type: 'string',
		},
        statusCode: {
            type: 'integer',
        },
        name: {
            type: 'string',
        },
        details: {
        },
		code: {
			type: 'string',
		},
		message: {
			type: 'string',
		},
	},
};
