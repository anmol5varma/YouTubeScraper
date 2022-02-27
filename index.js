console.time('execution-time');

require('dotenv').config();

const path = require('path');
const { INPUT_FILE_PATH, OUTPUT_FILE_PATH } = require('./constants/config');
const { getDataFromCSV, writeDataToCSV } = require('./utils/fileUtil');
const { getVideosByChannelId } = require('./utils/youtubeUtil');

const inputPath = path.join(__dirname, INPUT_FILE_PATH);
const outputPath = path.join(__dirname, OUTPUT_FILE_PATH);

getDataFromCSV(inputPath)
  .then((channelList) => Promise.all(
    channelList.map((channelId) => getVideosByChannelId(channelId)),
  ))
  .then((allVideoDetails) => {
    JSON.stringify(allVideoDetails);
    return allVideoDetails;
  })
  .then((allVideoDetails) => allVideoDetails.flat().reduce((acc, curr) => {
    const { channelId, ...otherDetails } = curr;
    const newAcc = { ...acc };
    if (newAcc[channelId]) {
      newAcc[channelId] = newAcc[channelId].concat(otherDetails);
    } else {
      newAcc[channelId] = [otherDetails];
    }
    return newAcc;
  }, {}))
  .then((channelWiseData) => {
    // console.log(channelWiseData);
    Object.keys(channelWiseData).map((channelId) => writeDataToCSV(`${outputPath}/${channelId}.csv`, channelWiseData[channelId]));
    console.timeEnd('execution-time');
  })
  .catch((err) => console.error(err));
