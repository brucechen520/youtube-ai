const { GEMINI_API_KEY = "YOUR_GEMINI_API_KEY_HERE" } = process.env;
const { GoogleGenAI } = require('@google/genai');
const ytdl = require('ytdl-core');
const {
    you_ting_hao_youtube_channel
} = require('config');
const { YouTubeTranscript } = require('youtube-transcript');
const {
    getYoutubeVideoId,
} = require('../lib/youtube');
const {
    InternalError,
} = require('../lib/errors/api-error');
const AI = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

// 檢查 API 金鑰的輔助函式
function checkApiKey() {
    if (!GEMINI_API_KEY) {
        throw new InternalError("Gemini API 金鑰未設定。請替換 'YOUR_GEMINI_API_KEY_HERE'。");
    }
}

/**
 * 處理非結構化（純文字）的內容生成。
 * @param {string} prompt - 輸入給模型的提示詞。
 * @returns {Promise<string>} - 模型生成的純文字內容。
 */
async function generateText(prompt, { model = 'gemini-2.5-flash' } = {}) {
    checkApiKey();
    console.log("-> 執行：非結構化文字生成。");

    try {
        const response = await AI.models.generateContent({
            model,
            contents: prompt,
            // 注意：這裡不傳遞 config 參數
        });

        // 確保回傳純文字
        return {
            content: response.text,
        };
    } catch (error) {
        console.error("文字生成時發生錯誤:", error);
        throw error;
    }
}

async function generateStructuredJson(prompt, { model = 'gemini-2.5-flash' } = {}) {
    // 呼叫 Gemini API 進行內容生成
    const response = await AI.models.generateContent({
        model, // 選擇您想使用的模型
        contents: prompt,
    });

    return {
        content: response.text,
    }
}

module.exports = {
    generateText,
    generateStructuredJson,
};
