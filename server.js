const http = require("http");
const fs = require("fs");
const path = require("path");
const { getAllBook, getBook, addBook, updateBook } = require("./module/book");

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

    fs.readFile(FILE_PATH, "utf8", (err, data) => {
      if (err) {
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: "Internal Server Error" }));
        return;
      }

      const books = JSON.parse(data);
      const book = books.find((item) => item.id === id);

      if (!book) {
        res.writeHead(404, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: "Book not found" }));
        return;
      } else {
        const newBooks = books.filter((item) => item.id !== book.id);
        fs.writeFile(FILE_PATH, JSON.stringify(newBooks, null, 2), (err) => {
          if (err) {
            res.writeHead(500, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ error: "Internal Server Error" }));
          }

          res.writeHead(203, { "Content-Type": "application/json" });
          delete book.id;
          res.end(JSON.stringify(book));
          return;
        });
      }
    });
  } else {
    res.end("Page not found");
    return;
  }
});

server.listen(PORT, () => {
  console.log(`Server running on PORT: ${PORT}`);
});
