const http = require("http");
const fs = require("fs");
const path = require("path");
const { getAllBook, getBook, addBook, updateBook, deleteBook } = require("./module/book");

const PORT = 4000;
const FILE_PATH = path.join(__dirname, "/data/", "books.json");

console.log(FILE_PATH);

const server = http.createServer((req, res) => {
  const { method, url, headers } = req;
  if (method === "GET" && url === "/books") return getAllBook(res);
  else if (method === "GET" && url.startsWith("/books/")) {
    return getBook(res, parseInt(url.split("/")[2]));
  } else if (method === "POST" && url === "/books") {
    return addBook(req, res);
  } else if (method === "PUT" && url.startsWith("/books/")) {
    const id = parseInt(url.split("/")[2]);
    return updateBook(req, res, id);
  } else if (method === "DELETE" && url.startsWith("/books/")) {
    const id = parseInt(url.split("/")[2]);
    return deleteBook(res, id);
  } else {
    res.end("Page not found");
    return;
  }
});

server.listen(PORT, () => {
  console.log(`Server running on PORT: ${PORT}`);
});
