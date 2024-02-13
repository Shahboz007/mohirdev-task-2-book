const http = require("http");
const fs = require("fs");
const path = require("path");
const { getAllBook } = require("./module/book");

const PORT = 4000;
const FILE_PATH = path.join(__dirname, "/data/", "books.json");

console.log(FILE_PATH);

const server = http.createServer((req, res) => {
  const { method, url, headers } = req;
  if (method === "GET" && url === "/books") {
    getAllBook(res)
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
    });
  } else if (method === "POST" && url === "/books") {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString();
    });

    req.on("end", () => {
      const { title, author } = JSON.parse(body);
      fs.readFile(FILE_PATH, "utf8", (err, data) => {
        if (err) {
          res.writeHead(500, { "Content-Type": "application/json" });
          req.end(JSON.stringify({ error: "Internal Server Error" }));
          return;
        }

        const books = JSON.parse(data);
        const existingBook = books.find((book) => book.title === title);

        if (existingBook) {
          res.writeHead(409, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ error: "Book already exists" }));
        } else {
          const newBook = {
            id: books.length + 1,
            title,
            author,
          };

          books.push(newBook);
          fs.writeFile(FILE_PATH, JSON.stringify(books, null, 2), (err) => {
            if (err) {
              res.writeHead(500, { "Content-Type": "application/json" });
              res.end(JSON.stringify({ error: "Internal Server Error" }));
              return;
            }

            res.writeHead(201, { "Content-Type": "application/json" });
            res.end(JSON.stringify(newBook));
          });
        }
      });
    });
  } else if (method === "PUT" && url.startsWith("/books/")) {
    const id = parseInt(url.split("/")[2]);

    let body = "";

    req.on("data", (chunk) => {
      body += chunk.toString();
    });

    req.on("end", () => {
      const { title, author } = JSON.parse(body);
      fs.readFile(FILE_PATH, "utf8", (err, data) => {
        if (err) {
          res.writeHead(500, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ error: "Internal Server Error" }));
          return;
        }

        const books = JSON.parse(data);
        const index = books.findIndex((book) => book.id === id);

        if (index !== -1) {
          books[index] = { id, title, author };
          fs.writeFile(FILE_PATH, JSON.stringify(books, null, 2), (err) => {
            if (err) {
              res.writeHead(500, { "Content-Type": "application/json" });
              res.end(JSON.stringify({ error: "Internal Server Error" }));
              return;
            }

            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify(books[index]));
          });
        } else {
          res.writeHead(404, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ error: "Book not found" }));
        }
      });
    });
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
