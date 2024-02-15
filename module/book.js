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
              return serverError(res, err);
            });
        }
      })
      .catch((err) => {
        return serverError(res, err);
      });
  });
}

// Update book
function updateBook(req, res, bookId) {
  let body = "";
  req.on("data", (chunk) => {
    body += chunk.toString();
  });

  req.on("end", () => {
    const { title, author } = JSON.parse(body);

    readFile(FILE_PATH)
      .then((books) => {
        const index = books.findIndex((item) => item.id === bookId);

        if (index !== -1) {
          // Validating existing
          if (books.find((book) => book.title === title)) {
            return existingRes(res);
          }

          books[index] = { id: bookId, title, author };

          writeFile(FILE_PATH, books)
            .then(() => {
              return successRes(res);
            })
            .catch((err) => {
              return serverError(res, err);
            });
        } else {
          return notFound(res, bookId);
        }
      })
      .catch((err) => {
        return serverError(res, err);
      });
  });
}

// Delete book
function deleteBook(res, bookId) {
  readFile(FILE_PATH)
    .then((books) => {
      const index = books.findIndex((item) => item.id === bookId);

      if (index !== -1) {
        const filterData = books.filter((item) => item.id !== bookId);
        writeFile(FILE_PATH, filterData)
          .then(() => {
            return successRes(res);
          })
          .catch((err) => {
            return serverError(err);
          });
      } else {
        return notFound(res, bookId);
      }
    })
    .catch((err) => {
      return serverError(res, err);
    });
}

module.exports = { getAllBook, getBook, addBook, updateBook, deleteBook };
