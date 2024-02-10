const fs = require("fs");

function mainReadFile(fileFullPath) {
  try {
    const data = fs.readFileSync(fileFullPath, "utf8");
    return data;
  } catch (err) {
    throw err;
  }
}

module.exports = { mainReadFile };
