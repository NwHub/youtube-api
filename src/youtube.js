const youTubeService = require("./service/YouTubeService.js");

async function getYouTube(videoId) {
  const channelInfo = await youTubeService.getChannelInfo(videoId);

  const channelId = channelInfo.channelId;
  const videoInfoList = await youTubeService.getVideoInfoList(channelId);

  const youTubeInfo = {
    channelInfo: channelInfo,
    videoInfoList: videoInfoList,
  };
  console.log(youTubeInfo);

  // console.log(JSON.stringify(await getVideoIdList(channelId), null, 2));
}

const videoId = "2dldq7XQdIo";
getYouTube(videoId);
