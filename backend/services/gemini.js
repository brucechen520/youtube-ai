const { GEMINI_API_KEY = 'YOUR_GEMINI_API_KEY_HERE' } = process.env;
import { GoogleGenAI } from '@google/genai';
import {
	InternalError,
} from '../lib/errors/api-error.js';
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
export async function generateText(prompt, { model = 'gemini-2.5-flash', isGoogleSearch = false } = {}) {
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

export async function generateYouTingHaoStructuredJson(prompt, { model = 'gemini-2.5-flash', transcript = '' } = {}) {
	checkApiKey();
	console.log('-> 執行：游廷皓的財經號角結構化文字生成。');
	const finalPrompt = `
		您是一位資深的財經分析師。
		依照影片逐字稿將所有重點資訊根據指定的 JSON Schema **嚴格**輸出。

		通用指令: ${prompt}

		---
		影片逐字稿: ${transcript}
	`;

	console.log('-> 最終提示詞內容: ', finalPrompt);

	const responseSchema = {
		type: 'object',
		properties: {
			video_info: {
				type: 'object',
				description: '影片的基本資訊。',
				properties: {
					title: { type: 'string', description: '影片的標題' },
					channel_name: { type: 'string', description: '頻道名稱' },
					url: { type: 'string', description: '影片網址' },
					publish_date: { type: 'string', format: 'date', description: '影片發布日期，格式為 YYYY-MM-DD' },
				},
				required: ['title', 'channel_name', 'url', 'publish_date']
			},
			main_themes: {
				type: 'array',
				description: '影片討論的每個主要財經議題，給我3-20個主要議題。',
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
						indicator: { type: 'string', description: '經濟指標或數據的名稱，例如「GDP 成長率」、「失業率」等。' },
						value: { type: 'string', description: '該指標的具體數值或百分比。' },
						unit: { type: 'string', description: '數值的單位，例如「百分比」、「美元」等。' },
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
						term: { type: 'string', description: '經濟學術語或概念的名稱。' },
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
						title: { type: 'string', description: '笑話的標題。' },
						content: { type: 'string', description: '笑話的內容。' },
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
		contents: finalPrompt,
		config: {
			responseMimeType: 'application/json',
			responseSchema,
		},
	});

	return {
		content: response.text,
	}
}
