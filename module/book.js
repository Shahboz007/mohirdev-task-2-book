const path = require("path");
const {
  successRes,
  serverError,
  notFound,
  successaaaRes,
  existingRes,
  createdRes,
} = require("../service/response");
const { readFile, writeFile } = require("../service/file");

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
      const index = data.findIndex((book) => book.id === bookId);

      if (!data[index]) return notFound(res, bookId);
      return successRes(res, data[index]);
    })
    .catch((err) => {
      return serverError(res, err);
    });
}

// Add book
function addBook(req, res) {
  let body = "";
  req.on("data", (chunk) => {
    body += chunk.toString();
  });

  req.on("end", () => {
    const { title, author } = JSON.parse(body);

    readFile(FILE_PATH)
      .then((books) => {
        const existingBook = books.find((book) => book.title === title);
        if (existingBook) {
          return existingRes(res);
        } else {
          // new
          const newBook = {
            id: books.length + 1,
            title,
            author,
          };

          // push
          books.push(newBook);
          writeFile(FILE_PATH, books)
            .then(() => {
              return createdRes(res, newBook);
            })
            .catch((err) => {
              console.log("render ==========================");
              return serverError(res, err);
            });
        }
      })
      .catch((err) => {
        return serverError(res, err);
      });
  });
}

// Put book
// Delete book

module.exports = { getAllBook, getBook, addBook };
