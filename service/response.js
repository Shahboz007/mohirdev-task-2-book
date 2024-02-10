function toJson(data) {
  return JSON.stringify(data);
}

function notFoundRes(res) {
  res.statusCode = 404;
  res.end(
    toJson({
      success: false,
      message: "Ma'lumot topilmadi!",
    })
  );
}

module.exports = {
  notFoundRes: (res) => notFoundRes(res),
};
