
function toLowerCaseMiddleware(req, res, next) {
  if (req.body && typeof req.body === "object") {
    for (let campo in req.body) {
      if (typeof req.body[campo] === "string") {
        req.body[campo] = req.body[campo].toLowerCase();
      }
    }
  }
  next();
}

module.exports = toLowerCaseMiddleware;