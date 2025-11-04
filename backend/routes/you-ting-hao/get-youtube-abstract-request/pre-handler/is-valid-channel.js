const { isYouTingHaoChannel } = require('../../../../lib/youtube');
const { UnprocessableEntityError } = require('../../../../lib/errors/api-error');

module.exports = async function (request, reply) {
	const isValid = await isYouTingHaoChannel(request.body.url);

	if (!isValid) {
		throw new UnprocessableEntityError("提供的影片網址不屬於「游庭皓 You Ting Hao」頻道，請確認後再試。");
	}
}
