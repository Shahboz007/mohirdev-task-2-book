const fs = require("fs");
const path = require("path");
const { notFoundRes } = require("../service/response");

const dataPath = "../data/";
const fileName = "books.json";

function createFile(data = []) {
  fs.writeFileSync(path.join(__dirname, dataPath, fileName), data);
}

function checkFileExists(path) {
  return fs.existsSync(path);
}

// index
function index(res) {
  if (!checkFileExists(dataPath)) return notFoundRes(res);

  fs.readFileSync(
    path.join(__dirname, dataPath, fileName),
    "utf8",
    (err, data) => {
      if (err) throw err;
      console.log(data);
    }
  );
}
// show
// edit
// delete

module.exports = { getAllBooks: (res) => index(res) };
