const fs = require("fs");

async function readFile(FILE_PATH) {
  return await new Promise((resolve, rejects) => {
    fs.readFile(FILE_PATH, "utf8", (err, data) => {
      if (err) {
        return rejects(err);
      }

      return resolve(JSON.parse(data));
    });
  });
}

async function writeFile(FILE_PATH, data) {
  return await new Promise((resolve, rejects) => {
    fs.writeFile(FILE_PATH, JSON.stringify(data, null, 2), (err) => {
      if (err) {
        return rejects(err);
      }

      return resolve();
    });
  });
}

module.exports = {
  readFile,
  writeFile
};
