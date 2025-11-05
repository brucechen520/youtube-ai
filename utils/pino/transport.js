import pino from 'pino';

let logger = null;

export default function (config) {
	if (logger !== null) {
		return logger;
	}

	logger = pino({
		redact: config.redact,
		base: false,
		errorKey: 'error',
		timestamp: pino.stdTimeFunctions.isoTime,
		level: config.level,
		mixin(_context, level) {
			return { 'label': logger.levels.labels[level] };
		},
		transport: {
			target: 'pino-pretty',
			options: {
				translateTime: 'yyyy-mm-dd HH:MM:ss Z',
				ignore: 'pid,hostname,label',
			},
			dedupe: true,
			sync: true,
		},
	});

	return logger;
};
