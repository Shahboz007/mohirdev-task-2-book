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

module.exports = {
  readFile,
};
