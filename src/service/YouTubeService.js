const youTubeApi = require("../repository/YouTubeApi");

exports.getChannelInfo = async function (videoId) {
  // 動画情報取得（1件）
  const videoInfo = await youTubeApi.getVideoInfo(videoId);

  // console.log(`videoInfoの中身：\n${JSON.stringify(videoInfo, null, 2)}`);

  const channelInfo = {
    channelId: "",
    channelTitle: "",
  };
  return channelInfo;
};

exports.getVideoInfoList = async function (channelId) {
  // チャンネルに紐づく動画情報を取得（直近50件）
  const videoDataList = await youTubeApi.getVideoDataList(channelId);

  console.log(`videoDataListの中身：\n${JSON.stringify(videoDataList, null, 2)}`);

  let videoInfoList = [];
  for (videoData of videoDataList) {
    const videoInfo = {
      viewCount: "",
      likeCount: "",
      dislikeCount: "",
      commentCount: "",
      videId: "",
      title: "",
      publishedAt: "",
    };
    videoInfoList.push(videoInfo);
    // もしくは
    // videoInfoList = [...videoInfoList, videoInfo];
  }

  return videoInfoList;
};
