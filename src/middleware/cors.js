function cors(req, res, next) {
  if (process.env.ENV !== "development") {
    return next();
  }

  res.set({
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "DELETE,GET,PATCH,POST,PUT",
    "Access-Control-Allow-Headers": "Content-Type,Authorization"
  });

  req.method === "OPTIONS"
    ? res.send(200)
    : next();
}

module.exports = cors;
