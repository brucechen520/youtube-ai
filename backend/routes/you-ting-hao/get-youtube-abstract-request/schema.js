export default {
	body: {
		type: 'object',
		required: ['prompt'],
		properties: {
			prompt: {
				type: 'string',
				minLength: 1,
			},
			url: {
				type: 'string',
				minLength: 1,
			},
			isGoogleSearch: {
				type: 'boolean',
				default: false,
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
				response: {},
			},
		},
	},
};
