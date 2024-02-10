const http = require("http");
const { getAllBooks } = require("./modules/books");



const server = http.createServer((req, res) => {
  switch (req.url) {
    case "/":
      res.end("Home");
    case "/books": getAllBooks(res)
  }
});

// PORT
const PORT = process.env.PORT | 4000;

server.listen(PORT,() => {
  console.log(`Server running on PORT: ${PORT}`)
});
