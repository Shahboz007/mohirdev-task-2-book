const path = require("path");
const { successRes, serverError } = require("../service/response");
const { readFile } = require("../service/file");

const FILE_PATH = path.join(__dirname, "../data/", "books.json");

function getAllBook(res) {
  readFile(FILE_PATH)
    .then((data) => {
      return successRes(res, JSON.parse(data));
    })
    .catch((err) => {
      return serverError(res, err);
    });
}

module.exports = { getAllBook };
