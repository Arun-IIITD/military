function loggerMiddleware(req, res, next) {

  const log = {
    time: new Date(),
    method: req.method,
    route: req.originalUrl,
    user: req.user ? req.user.id : "guest",
    body: req.body
  };

  console.log("API LOG:", log);

  next();
}

module.exports = loggerMiddleware;