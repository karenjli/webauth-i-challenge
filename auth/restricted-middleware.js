const session = require("express-session");

function restrict(req, res, next) {
  if (req.session && req.session.username) {
    next();
  } else {
    res.status(401).json({ message: "You shall not pass" });
  }
}

module.exports = restrict;