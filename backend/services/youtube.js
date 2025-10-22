const { GoogleGenAI } = require('@google/genai');
const { GEMINI_API_KEY = "YOUR_GEMINI_API_KEY_HERE" } = process.env;

async function generateAIContent(prompt) {
    // 初始化 Google GenAI SDK
    // 它可以自動從 process.env.GEMINI_API_KEY 讀取金鑰，
    // 但這裡我們顯式傳入以示範如何設定。
    const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

    // ----------------------------------------------------------
    // 路由定義：/generate
    // ----------------------------------------------------------
    // 檢查 API 金鑰是否已設定
    if (GEMINI_API_KEY === "YOUR_GEMINI_API_KEY_HERE" || !GEMINI_API_KEY) {
        return reply.status(500).send({ error: "Gemini API 金鑰未設定。請替換 'YOUR_GEMINI_API_KEY_HERE'。" });
    }

    // 呼叫 Gemini API 進行內容生成
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash', // 選擇您想使用的模型
        contents: prompt,
    });

    // 從回應中提取文字內容
    const generatedText = response.text;

    return {
        content: generatedText
    }
}

module.exports = {
    generateAIContent,
};
