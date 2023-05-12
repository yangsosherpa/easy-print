

function logger(req, res, next) {
  let url = req.originalUrl;
  let method = req.method;
  console.log(`Method: ${method} | URL: ${url}`);
  next();
}

module.exports = logger;