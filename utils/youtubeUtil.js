const youtubeService = require('./youtubeService');
const { YOUTUBE_KEY, BASE_URL } = require('../constants/config');

const youtubeConfig = {
  key: YOUTUBE_KEY,
};

const getVideosByChannelId = (channelId) => youtubeService.init(youtubeConfig)
  .then(() => youtubeService.fetchAllVideosFromChannel(channelId))
  .then((allVideos) => Promise.all(
    allVideos.map((video) => youtubeService.getVideoDetail(video.id.videoId)
      .then((videoDetail) => ({
        url: BASE_URL + videoDetail.items[0].id,
        title: videoDetail.items[0].snippet.title,
        description: videoDetail.items[0].snippet.description,
        channelId,
      }))),
  ));

module.exports = {
  getVideosByChannelId,
};
