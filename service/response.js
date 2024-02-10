function toJson(data) {
  return JSON.stringify(data);
}

function notFoundRes(res) {
  res.writeHead(404, { "Content-Type": "application/json" });
  res.statusCode = 404;
  res.end(
    toJson({
      success: false,
      message: "Not Found!",
    })
  );
}

function successRes(res, data) {
  res.writeHead(200, { "Content-Type": "application/json" });
  res.write(
    toJson({
      success: false,
      message: "Successfully!",
      data,
    })
  );
  res.end();
}

function serverErrRes(res, err) {
  console.error("Error reading file:", err);
  res.writeHead(500, { "Content-Type": "application/json" });
  res.end("Internal Server Error");
}

module.exports = {
  notFoundRes,
  successRes,
  serverErrRes
};
