const REGEX_TOTP = '^\\d{6}$';
const REGEX_PASSWORD_WITH_ONE_NUMBER_AND_ONE_ALPHABET = `^(?=.*[A-Za-z])(?=.*\\d)(?=.)[A-Za-z!@#$%^&*()_+\\-=\\[\\]{};':"\\|,.<>\\/?\\d]*$`;

export default {
	$id: 'common',
	type: 'object',
	properties: {
		id: {
			type: 'integer',
			minimum: 0,
		},
		status: {
			type: 'integer',
			minimum: 0,
		},
		offset: {
			type: 'integer',
			minimum: 0,
		},
		base64: {
			type: 'string',
			format: 'byte',
			minLength: 1,
			maxLength: 25165824,
		},
		limit30: {
			type: 'integer',
			minimum: 1,
			maximum: 30,
		},
		limit50: {
			type: 'integer',
			minimum: 1,
			maximum: 50,
		},
		limit100: {
			type: 'integer',
			minimum: 1,
			maximum: 100,
		},
		limit150: {
			type: 'integer',
			minimum: 1,
			maximum: 150,
		},
		sort: {
			type: 'string',
		},
		order: {
			type: 'string',
			enum: ['asc', 'desc'],
		},
		ordering: {
			type: 'integer',
			minimum: 1,
		},
		password: {
			type: 'string',
			minLength: 6,
			maxLength: 20,
			pattern: REGEX_PASSWORD_WITH_ONE_NUMBER_AND_ONE_ALPHABET,
		},
		totp: {
			type: 'string',
			pattern: REGEX_TOTP,
		},
		totpSecret: {
			type: 'string',
			minLength: 16,
			maxLength: 16,
		},
		ip: {
			type: 'string',
			oneOf: [
				{
					format: 'ipv4',
				},
				{
					format: 'ipv6',
				},
			],
		},
		hour: {
			type: 'integer',
			minimum: 0,
			maximum: 23,
		},
		minute: {
			type: 'integer',
			minimum: 0,
			maximum: 59,
		},
		type: {
			type: 'integer',
			minimum: 0,
		},
		ext: {
			type: 'string',
			minLength: 1,
			maxLength: 5,
		},
		queriedDateRange: {
			type: 'array',
			items: {
				type: 'integer',
			},
			minItems: 0,
			maxItems: 2,
		},
		team: {
			type: 'boolean',
		},
		file: {
			type: 'boolean',
		},
		sum: {
			type: 'boolean',
		},
		paranoid: {
			type: 'boolean',
		},
		children: {
			type: 'boolean',
		},
		date: {
			type: 'string',
			format: 'date',
		},
		amount: {
			type: 'number',
			multipleOf: 0.0001,
		},
		url: {
			type: 'string',
			format: 'url',
		},
	},
};
