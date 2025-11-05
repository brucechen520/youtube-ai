import schema from './schema.js';
import preHandler from './pre-handler/index.js';
import handler from './handler.js';

// 使用 ESM 的 export default 導出物件
export default {
    schema,
    preHandler,
    handler,
};
