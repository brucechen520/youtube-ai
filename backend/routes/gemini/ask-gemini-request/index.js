// ESM 檔案 (routes/user.js 或 .mjs)

// 1. 引入依賴項：將 require() 替換為 import
//	注意：本地檔案必須加上 .js 副檔名！
import schema from './schema.js';
import handler from './handler.js';

// 2. 導出：將 module.exports = { ... } 替換為 export { ... }
export default {
	schema,
	handler,
};
