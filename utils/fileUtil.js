const { parse, format } = require('fast-csv');
const fs = require('fs');

const getDataFromCSV = (filePath) => {
  let result;
  return new Promise((resolve) => fs.createReadStream(filePath)
    .pipe(parse({ headers: false }))
    .on('data', (data) => {
      result = data;
    })
    .on('end', () => {
      resolve(result);
    }));
};

const writeDataToCSV = (fileName, data) => {
  const csvFile = fs.createWriteStream(fileName);
  const stream = format({ headers: true });
  stream.pipe(csvFile);

  for (let i = 0; i < data.length; i += 1) { stream.write(data[i]); }

  stream.end();
  console.log(`${fileName} written successfully`);
};

module.exports = {
  getDataFromCSV,
  writeDataToCSV,
};
