const axios = require("axios");

// YouTube Apiの取得件数 0〜50
const MAX_SEARCH = 10;
// 動画情報の最大件数
const MAX_VIDEO_COUNT = 20;

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
async function getVideoInfo(videoId) {
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
}

// [
//   ['2CXvkGbiwbs','DQ5IquyRCNI'],
//   ['SPoNd1sA_Mo','VdmnL5MftRI']
// ]
async function getVideoIdMultiList(channelId) {
  let videoIdMultiList = [];
  let nextPageToken = "";
  let videoCount = 0;
  while (videoCount < MAX_VIDEO_COUNT) {
    let videoIdList = [];
    try {
      const response = await axios.get(`${BASE_URL}/search`, {
        params: {
          key: KEY,
          channelId: channelId,
          part: "id",
          order: "date",
          type: "video",
          maxResults: MAX_SEARCH,
          pageToken: nextPageToken,
        },
      });

      // console.log(JSON.stringify(response.data, null, 2));

      videoIdList = response.data.items.map((item) => item.id.videoId);
      nextPageToken = response.data.nextPageToken;
    } catch (error) {
      console.log(error);
    }

    videoIdMultiList = [...videoIdMultiList, videoIdList];

    if (!nextPageToken) {
      break;
    }

    videoCount += videoIdList.length;
  }

  return videoIdMultiList;
}

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
async function getVideoInfoList(videoIdMultiList) {
  let responseVideoInfoList = [];
  for (const videoIdList of videoIdMultiList) {
    let videoInfoList = [];
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

      videoInfoList = response.data.items.map((item) => {
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
    } catch (error) {
      console.log(error);
    }

    responseVideoInfoList = [...responseVideoInfoList, ...videoInfoList];
  }
  return responseVideoInfoList;
}

async function main() {
  const videoId = "2dldq7XQdIo";

  const videoInfo = await getVideoInfo(videoId);
  // console.log(videoInfo);

  const videoIdMultiList = await getVideoIdMultiList(videoInfo.channelId);
  // console.log(videoIdMultiList);

  const videoInfoList = await getVideoInfoList(videoIdMultiList);
  // console.log(videoInfoList);

  // {
  //   channelInfo: {
  //     channelId: 'UCAwDrM75UAddwluabae4A6g',
  //     channelTitle: '森内俊之の森内チャンネル'
  //   },
  //   videoDataList: [
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
  // }
  const youTubeInfo = {
    channelInfo: {
      channelId: videoInfo.channelId,
      channelTitle: videoInfo.channelTitle,
    },
    videoDataList: videoInfoList,
  };
  console.log(youTubeInfo);

  // console.log(JSON.stringify(await getVideoIdList(channelId), null, 2));
}

main();
