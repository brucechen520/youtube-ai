import Gemini_AskGeminiRequest from './gemini/ask-gemini-request/index.js';
import YOUTINGHAO_GetYoutubeAbstractRequest from './you-ting-hao/get-youtube-abstract-request/index.js';

export default function (fastify, options, done) {
	// Add RESTful API step1 : add routes with schema and handler
	// Gemini request
	fastify.post('/gemini/ask', Gemini_AskGeminiRequest);
	fastify.post('/you-ting-hao/abstract', YOUTINGHAO_GetYoutubeAbstractRequest);

	done();
};
