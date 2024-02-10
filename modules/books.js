const fs = require("fs");
const path = require("path");
const {
  notFoundRes,
  successRes,
  serverErrRes,
} = require("../service/response");
const { log } = require("console");
const { mainReadFile } = require("../service/file");

const dataPath = "../data/";
const fileName = "books.json";
const fullFilePath = path.join(__dirname, dataPath, fileName);

function createFile(data = []) {
  fs.writeFileSync(path.join(__dirname, dataPath, fileName), data);
}

function checkFileExists(url) {
  return fs.existsSync(url);
}

// index
async function index(res) {
  if (!checkFileExists(fullFilePath)) return notFoundRes(res);

  console.log(fullFilePath);

  try {
    const data = mainReadFile(fullFilePath);
    successRes(res, JSON.parse(data))
  } catch (err) {
    console.error("Error reading file:", err);
    successRes(res, err)
  }
}

// show
function show(res, bookId) {
  if (!checkFileExists(fullFilePath)) return notFoundRes(res);
}
// edit
// delete

module.exports = { getAllBooks: (res) => index(res) };
