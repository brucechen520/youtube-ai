import {
	getYoutubeTranscript,
	getYoutubeVideoId,
} from '../../../../lib/youtube/index.js';
import { UnprocessableEntityError } from '../../../../lib/errors/api-error.js';

export default async function (request, reply) {
	const videoId = getYoutubeVideoId(request.body.url);

	const transcript = await getYoutubeTranscript(videoId);

	if (!transcript) {
		throw new UnprocessableEntityError("無法取得影片的逐字稿，請確認影片網址是否正確。");
	}

	reply.locals.transcript = transcript;
}
