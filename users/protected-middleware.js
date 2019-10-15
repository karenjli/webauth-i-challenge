const userDb = require("./userModel");
const bcrypt = require("bcryptjs");

function auth(req, res, next) {
  const { username, password } = req.headers;
  if (username && password) {
    userDb
      .findBy({ username })
      .first()
      .then(user => {
        if (user && bcrypt.compareSync(password, user.password)) {
          next();
        } else {
          res
            .status(401)
            .json({ message: "Username and Password are required" });
        }
      })
      .catch(error => {
        res
          .status(500)
          .json({ message: "Unexpected error with middleware", error: error });
      });
  } else {
    res.status(401).json({ message: "Username and/or Password is missing" });
  }
}

module.exports = auth;
