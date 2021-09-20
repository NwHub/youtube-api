const axios = require("axios");

// YouTube Apiの取得件数 0〜50
const MAX_SEARCH = 5;
// 動画情報の最大件数
// const MAX_VIDEO_COUNT = 20;

// YouTube APIのベースURL
// const BASE_URL = "https://www.googleapis.com/youtube/v3";
const BASE_URL = "http://localhost:3000";

// YouTube API KEY ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
const KEY = "AIzaSyBSikAMN12xdJYKo5ehLIwZ8aHJarao9qI";

// 返却値
// {
//   publishedAt: "2021-06-15T09:00:00Z",
//   channelId: "UCAwDrM75UAddwluabae4A6g",
//   title: "森内・環那の本音炸裂！『環那タイトル戦への道』一年の振返り",
//   channelTitle: "森内俊之の森内チャンネル",
//   categoryId: "22",
//   liveBroadcastContent: "none",
//   他省略
// }
exports.getVideoInfo = async function (videoId) {
  try {
    const response = await axios.get(`${BASE_URL}/videos`, {
      params: {
        key: KEY,
        id: videoId,
        part: "snippet",
        maxResults: 1,
      },
    });
    // console.log(JSON.stringify(response.data, null, 2));
    return response.data.items[0].snippet;
  } catch (error) {
    console.log(error);
  }
};

// 返却値
// [
//   {
//     id: 'Neo78dctN8I',
//     snippet: {
//       publishedAt: '2021-08-22T09:00:30Z',
//       title: '【第二弾】将棋ウォーズ指導対局　森内ついに時間切れか⁉',
//       channelTitle: '森内俊之の森内チャンネル',
//       他省略
//     },
//     statistics: {
//       viewCount: '101996',
//       likeCount: '1860',
//       dislikeCount: '40',
//       favoriteCount: '0',
//       commentCount: '187'
//     }
//   },
//   {
//     id: 'AiZss6ZIJHI',
//     snippet: {
//       publishedAt: '2021-08-11T03:00:06Z',
//       title: '森内・将棋ウォーズの指導対局に初挑戦！',
//       他省略
//     },
//     statistics: {
//       viewCount: '217670',
//       likeCount: '1860',
//       dislikeCount: '40',
//       favoriteCount: '0',
//       commentCount: '187'
//     }
//   },
// ]
exports.getVideoDataList = async function (channelId) {
  try {
    const videoIdList = await getVideoIdList(channelId);
    const commaVideoIdList = videoIdList.join(",");
    const response = await axios.get(`${BASE_URL}/videos`, {
      params: {
        key: KEY,
        id: commaVideoIdList,
        part: "snippet,statistics",
        maxResults: MAX_SEARCH,
      },
    });

    // console.log(JSON.stringify(response.data, null, 2));
    return response.data.items;
  } catch (error) {
    console.log(error);
  }
};

// 返却値
// ['2CXvkGbiwbs','DQ5IquyRCNI']
async function getVideoIdList(channelId) {
  try {
    const response = await axios.get(`${BASE_URL}/search`, {
      params: {
        key: KEY,
        channelId: channelId,
        part: "id",
        order: "date",
        type: "video",
        maxResults: MAX_SEARCH,
      },
    });

    // console.log(JSON.stringify(response.data, null, 2));
    return response.data.items.map((item) => item.id.videoId);
  } catch (error) {
    console.log(error);
  }
}
