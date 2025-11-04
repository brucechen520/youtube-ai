const ytdl = require('@distube/ytdl-core');
const { YoutubeTranscript } = require('youtube-transcript');
const { PromptTemplate } = require('@langchain/core/prompts');
const { LLMChain, SimpleSequentialChain } = require('langchain');
const {
	UnprocessableEntityError
} = require('../errors/api-error');

const {
	you_ting_hao_youtube_channel
} = require('config');

async function isYouTingHaoChannel(url) {
	const videoId = getYoutubeVideoId(url);

	// 使用 getInfo() 獲取所有資訊
	const info = await ytdl.getBasicInfo(url);

	if (!info) {
		throw new UnprocessableEntityError("無法取得影片資訊，請確認影片網址是否正確。");
	}

	if (you_ting_hao_youtube_channel !== info.videoDetails.author.name) {
		return false;
	}

	return true;
}

function getYoutubeVideoId(url) {
	// 1. 建立 URL 物件來解析網址
	const urlObject = new URL(url);

	// 2. 使用 searchParams 屬性取得所有查詢參數
	// 'v' 就是我們尋找的參數名稱
	const videoId = urlObject.searchParams.get('v');

	if (!videoId) {
		throw new UnprocessableEntityError("無效的 YouTube 影片網址，無法找到影片 ID。");
	}

	return videoId;
}

async function getYoutubeTranscript(videoId) {
	const transcript = await YoutubeTranscript.fetchTranscript(videoId);

    // todo: 處理 transcript，轉換成純文字

	return transcript;
}

module.exports = {
	getYoutubeVideoId,
	isYouTingHaoChannel,
	getYoutubeTranscript,
}
