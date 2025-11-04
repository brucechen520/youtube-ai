const { GEMINI_API_KEY = 'YOUR_GEMINI_API_KEY_HERE' } = process.env;
const { GoogleGenAI } = require('@google/genai');
const { YouTubeTranscript } = require('youtube-transcript');
const {
	InternalError,
} = require('../lib/errors/api-error');
const { properties } = require('../lib/schemas/youtube');
const AI = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

// 檢查 API 金鑰的輔助函式
function checkApiKey() {
	if (!GEMINI_API_KEY) {
		throw new InternalError('Gemini API 金鑰未設定。請替換 "YOUR_GEMINI_API_KEY_HERE"。');
	}
}

/**
 * 處理非結構化（純文字）的內容生成。
 * @param {string} prompt - 輸入給模型的提示詞。
 * @returns {Promise<string>} - 模型生成的純文字內容。
 */
async function generateText(prompt, { model = 'gemini-2.5-flash', isGoogleSearch = false } = {}) {
	checkApiKey();
	console.log('-> 執行：非結構化文字生成。');

	const config = {};

	if (isGoogleSearch) {
		// 啟用 Google Search 工具
		config.tools = [{ googleSearch: {} }];
	}

	const response = await AI.models.generateContent({
		model,
		contents: prompt,
		config,
	});

	console.log(`-> 結果：${response.text}。`);

	// 確保回傳純文字
	return {
		content: response.text,
	};
}

async function generateYouTingHaoStructuredJson(prompt, { model = 'gemini-2.5-flash', isGoogleSearch = false } = {}) {
	checkApiKey();
	console.log('-> 執行：游廷皓的財經號角結構化文字生成。');
	const responseSchema = {
		type: 'object',
		properties: {
			video_info: {
				type: 'object',
				description: '影片的基本資訊。',
				properties: {
					title: { type: 'string' },
					channel_name: { type: 'string' },
					url: { type: 'string' },
					publish_date: { type: 'string', format: 'date' }
				},
				required: ['title', 'channel_name', 'url', 'publish_date']
			},
			main_themes: {
				type: 'array',
				description: '影片討論的每個主要財經/政治議題。',
				items: {
					type: 'object',
					properties: {
						theme: { type: 'string', description: '主要議題的簡短名稱。' },
						summary: { type: 'string', description: '針對此主題的完整討論摘要。' },
						time: { type: 'string', description: '此議題開始討論的時間點，格式為 [HH:MM:SS]。' }
					},
					required: ['theme', 'summary', 'time']
				}
			},
			key_economic_data: {
				type: 'array',
				description: '影片中提到的所有具體經濟數據或市場數值。',
				items: {
					type: 'object',
					properties: {
						indicator: { type: 'string' },
						value: { type: 'string' },
						unit: { type: 'string' },
						note: { type: 'string', description: '數據的關鍵摘要或背景解釋。' },
						time: { type: 'string', description: '提到此數據的時間點，格式為 [HH:MM:SS]。' }
					},
					required: ['indicator', 'value', 'unit', 'time']
				}
			},
			econmic_terminologies: {
				type: 'array',
				description: '影片中解釋的經濟學術語或概念。',
				items: {
					type: 'object',
					properties: {
						term: { type: 'string' },
						definition: { type: 'string', description: '該術語的清晰定義或解釋。' },
						time: { type: 'string', description: '術語解釋開始的時間點，格式為 [HH:MM:SS]。' }
					},
					required: ['term', 'definition', 'time'],
				},
			},
			jokes: {
				type: 'array',
				description: '影片中單獨講述的笑話或故事。',
				items: {
					type: 'object',
					properties: {
						title: { type: 'string' },
						content: { type: 'string' },
						time: { type: 'string', description: '笑話開始的時間點，格式為 [HH:MM:SS]。' }
					},
					required: ['title', 'content', 'time'],
				},
			},
		},
		required: ['video_info', 'main_themes', 'key_economic_data']
	};
	// 呼叫 Gemini API 進行內容生成
	const response = await AI.models.generateContent({
		model, // 選擇您想使用的模型
		contents: prompt,
		config: {
			responseMimeType: 'application/json',
			responseSchema,
		},
	});

	return {
		content: response.text,
	}
}

module.exports = {
	generateText,
	generateYouTingHaoStructuredJson,
};
