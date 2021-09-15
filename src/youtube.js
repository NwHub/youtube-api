const youTubeService = require("./service/YouTubeService");

async function getYouTube(videoId) {
  // チャンネル情報取得
  const channelInfo = await youTubeService.getChannelInfo(videoId);

  const channelId = channelInfo.channelId;
  // 動画情報リスト取得
  const videoInfoList = await youTubeService.getVideoInfoList(channelId);

  const youTubeInfo = {
    channelInfo: channelInfo,
    videoInfoList: videoInfoList,
  };
  console.log(youTubeInfo);
  return youTubeInfo;
}

const videoId = "2dldq7XQdIo";
getYouTube(videoId);
