const fs = require("fs");

async function readFile(FILE_PATH) {
  return await new Promise((resolve, rejects) => {
    fs.readFile(FILE_PATH, "utf8", (err, data) => {
      if (err) {
        rejects(err);
        return;
      }
      resolve(data);
      return;
    });
  });
}

module.exports = {
  readFile,
};
