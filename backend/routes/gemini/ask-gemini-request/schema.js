module.exports = {
	body: {
		type: 'object',
		required: ['prompt'],
		properties: {
			prompt: {
				type: 'string',
				minLength: 1,
			},
		},
	},
	response: {
		default: {
			$ref: 'error#',
		},
		200: {
			type: 'object',
			properties: {
				response: { $ref: 'youtube#/properties/response' },
			},
		},
	},
};
