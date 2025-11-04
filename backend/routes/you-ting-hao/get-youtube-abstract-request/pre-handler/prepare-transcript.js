const { getYoutubeTranscript } = require('../../../../lib/youtube');

module.exports = async function (request, reply) {
	const transcript = await getYoutubeTranscript(request.body.url);

	if (!transcript) {
		throw new UnprocessableEntityError("無法取得影片的逐字稿，請確認影片網址是否正確。");
	}

	reply.locals.transcript = transcript;
}
