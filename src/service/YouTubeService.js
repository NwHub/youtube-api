const youTubeApi = require("../repository/YouTubeApi");

exports.getChannelInfo = async function (videoId) {
  const videoInfo = await youTubeApi.getVideoInfo(videoId);
  const channelInfo = {
    channelId: videoInfo.channelId,
    channelTitle: videoInfo.channelTitle,
  };
  return channelInfo;
};

exports.getVideoInfoList = async function (channelId) {
  const videoDataList = await youTubeApi.getVideoDataList(channelId);

  let videoInfoList;
  for (videoData of videoDataList) {
    const videoInfo = {
      viewCount: videoData.statistics.viewCount,
      likeCount: videoData.statistics.likeCount,
      dislikeCount: videoData.statistics.dislikeCount,
      commentCount: videoData.statistics.commentCount,
      videId: videoData.id,
      title: videoData.snippet.title,
      publishedAt: videoData.snippet.publishedAt,
    };
    videoInfoList.push(videoInfo);
    // もしくは
    // videoInfoList = [...videoInfoList, videoInfo];
  }

  return videoInfoList;
};
