const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = 4000;
const FILE_PATH = path.join(__dirname, "/data/", "books.json");

console.log(FILE_PATH);

const server = http.createServer((req, res) => {
  const { method, url, headers } = req;
  if (method === "GET" && url === "/books") {
    fs.readFile(FILE_PATH, "utf8", (err, data) => {
      if (err) {
        // res.writeHead(500, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ err: "Internal Server Error" }));
        return;
      }

      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(data);
    });
  } else if (method === "GET" && url.startsWith("/books/")) {
    const id = parseInt(url.split("/")[2]);
    fs.readFile(FILE_PATH, "utf8", (err, data) => {
      if (err) {
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: "Internal Server Error" }));
        return;
      }

      const books = JSON.parse(data);
      const book = books.find((book) => book.id === id);

      if (book) {
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(book));
      } else {
        res.writeHead(404, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: "Book not found" }));
      }
    })
  }else {
    res.end('Page not found')
    return;
  }
});

server.listen(PORT, () => {
  console.log(`Server running on PORT: ${PORT}`);
});
