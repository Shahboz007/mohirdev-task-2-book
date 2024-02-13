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

function serverError(res,err) {
  console.log('Internal Server Err', err)
  res.writeHead(500, headData);
  res.end(
    JSON.stringify({
      success: true,
      message: "Internal Server Error",
    })
  );
}

module.exports = {
  successRes,
  serverError,
};
