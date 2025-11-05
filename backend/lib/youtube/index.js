import ytdl from '@distube/ytdl-core';
import { fetchTranscript } from 'youtube-transcript-plus';
// 修改後的程式碼 (使用非同步動態 import)
import { PromptTemplate } from '@langchain/core/prompts';
// import { LLMChain, SimpleSequentialChain } from 'langchain';
import {
	UnprocessableEntityError
} from '../errors/api-error.js';
import config from 'config';

const { you_ting_hao_youtube_channel } = config;

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
	// 游庭皓的財經號角用這個套件無法爬到字幕逐字稿，逐字稿的做法先 pending
	const transcript = await fetchTranscript(videoId, { lang: 'zh-TW' });

	const transcriptText = transcript
		.map(item => {
			const minutes = Math.floor(item.offset / 60);
			const seconds = item.offset % 60;
			// 確保時間格式是 LLM 容易識別的 [MM:ss]
			const timeString = `[${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}]`;

			// 僅移除 [Music] 等標記，保留語音文字
			const cleanText = item.text.replace(/\[.*?\]/g, '').trim();

			// 使用 | 確保時間和文本的分隔
			return `${timeString}|${cleanText}`;
		})
		.join(' ')
		.replace(/(?:哦|啦|嘛|啊|誒|嗯|那|不過|當然|事實上|這個)\s*/g, '')
		.trim();

	return transcriptText;
}

export {
	getYoutubeVideoId,
	isYouTingHaoChannel,
	getYoutubeTranscript,
}
