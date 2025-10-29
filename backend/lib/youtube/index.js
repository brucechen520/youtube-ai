const {
    UnprocessableEntityError
} = require('../errors/api-error');

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

module.exports = {
    getYoutubeVideoId,
}
