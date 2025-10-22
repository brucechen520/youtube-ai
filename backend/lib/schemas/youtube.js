const {
	ENUM_YOUTUBE_STATUS,
} = require('../enums');

module.exports = {
	$id: 'youtube',
	type: 'object',
	properties: {
		id: {
			$ref: 'common#/properties/id',
		},
		response: {
			type: 'string',
		},
		status: {
			$ref: 'common#/properties/status',
			enum: Object.values(ENUM_YOUTUBE_STATUS),
		},
		createdAt: {
			type: 'string',
			format: 'date-time',
		},
		updatedAt: {
			type: 'string',
			format: 'date-time',
		},
	},
};
