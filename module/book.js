const path = require("path");
const { successRes, serverError, notFound } = require("../service/response");
const { readFile } = require("../service/file");

const FILE_PATH = path.join(__dirname, "../data/", "books.json");

// Get all books
function getAllBook(res) {
  readFile(FILE_PATH)
    .then((data) => {
      return successRes(res, data);
    })
    .catch((err) => {
      return serverError(res, err);
    });
}

// Get book
function getBook(res, bookId) {
  readFile(FILE_PATH)
    .then((data) => {
      const index = data.findIndex(book => book.id ===bookId);

      if(!data[index]) return notFound(res, bookId);
      return successRes(res, data[index]);
    })
    .catch((err) => {
      return serverError(res, err);
    });
}

module.exports = { getAllBook, getBook };
