const youTubeApi = require("../repository/YouTubeApi");

exports.getChannelInfo = async function (videoId) {
  const channelInfo = await youTubeApi.getChannelInfo(videoId);
  return channelInfo;
};

exports.getVideoInfoList = async function (channelId) {
  const videoIdList = await youTubeApi.getVideoIdList(channelId);
  const videoInfoList = await youTubeApi.getVideoInfoList(videoIdList);
  return videoInfoList;
};
