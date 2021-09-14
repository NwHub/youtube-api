const axios = require("axios");

// YouTube Apiの取得件数 0〜50
const MAX_SEARCH = 10;
// 動画情報の最大件数
// const MAX_VIDEO_COUNT = 20;

// YouTube APIのベースURL
const BASE_URL = "https://www.googleapis.com/youtube/v3";
// const BASE_URL = "http://localhost:3000";

// YouTube API KEY
// const KEY = "AIzaSyBSikAMN12xdJYKo5ehLIwZ8aHJarao9qI";
const KEY = "AIzaSyAlK6jX7vh3uAaV2M0E_mncRt85fx5ote0";

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
exports.getChannelInfo = async function (videoId) {
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
    return {
      channelId: response.data.items[0].snippet.channelId,
      channelTitle: response.data.items[0].snippet.channelTitle,
    };
  } catch (error) {
    console.log(error);
  }
};

// [
//   ['2CXvkGbiwbs','DQ5IquyRCNI'],
//   ['SPoNd1sA_Mo','VdmnL5MftRI']
// ]
exports.getVideoIdList = async function (channelId) {
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
};

//   [
//     {
//       viewCount: '96756',
//       likeCount: '2826',
//       dislikeCount: '24',
//       commentCount: '53',
//       videId: '2CXvkGbiwbs',
//       title: '一周年生放送！佐藤会長にご出演いただきます！！！',
//       publishedAt: '2021-06-19T10:38:55Z'
//     },
//     ...
//   ]
exports.getVideoInfoList = async function (videoIdList) {
  try {
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

    const videoInfoList = response.data.items.map((item) => {
      const videoInfo = {
        viewCount: item.statistics.viewCount,
        likeCount: item.statistics.likeCount,
        dislikeCount: item.statistics.dislikeCount,
        commentCount: item.statistics.commentCount,
        videId: item.id,
        title: item.snippet.title,
        publishedAt: item.snippet.publishedAt,
      };
      return videoInfo;
    });
    return videoInfoList;
  } catch (error) {
    console.log(error);
  }
};
