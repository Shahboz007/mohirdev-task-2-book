const headData = { "Content-Type": "application/json" };

function successRes(res, data) {
  res.writeHead(200, headData);
  res.end(
    JSON.stringify({
      success: true,
      message: "Successfully",
      data,
    })
  );
}

function createdRes(res, data) {
  res.writeHead(201, headData);
  res.end(JSON.stringify({
    success: true,
    message: 'Book created',
    data
  }));
}

function notFound(res, notFoundId) {
  res.writeHead(404, headData);
  res.end(
    JSON.stringify({
      success: false,
      message: `This ${notFoundId} book not found`,
    })
  );
}

function existingRes(res) {
  res.writeHead(200, headData);
  res.end(
    JSON.stringify({
      success: false,
      message: "Book already exists",
    })
  );
}

function serverError(res, err) {
  console.log("Internal Server Err", err);
  res.writeHead(500, headData);
  res.end(
    JSON.stringify({
      success: false,
      message: "Internal Server Error",
    })
  );
}

module.exports = {
  successRes,
  createdRes,
  notFound,
  existingRes,
  serverError,
};
