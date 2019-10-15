const router = require("express").Router();
const session = require("express-session");
const bcrypt = require("bcryptjs");

const authDb = require("./authModel");

router.get("/", (req, res) => {
  res.status(200).json({ message: "This is working" });
});

router.post("/register", (req, res) => {
  let newUser = req.body;
  const hash = bcrypt.hashSync(newUser.password, 8);
  newUser.password = hash;
  authDb
    .add(newUser)
    .then(user => {
      res.send(user);
    })
    .catch(error => {
      res
        .status(500)
        .json({ message: "Error registering new account on server" });
    });
});

router.post("/login", (req, res) => {
  const { username, password } = req.body;
  authDb
    .findBy({ username })
    .first()
    .then(user => {
      req.session.username = username;
      if (username && bcrypt.compareSync(password, user.password)) {
        res.status(200).json({ message: "Login successful" });
      } else {
        res.status(500).json({ message: "Error loging in to server" });
      }
    });
});

router.get("/logout", (req, res) => {
  if (req.session) {
    req.session.destroy(err => {
      res
        .status(200)
        .json({ message: "You can take a break, but you can't leave!" });
    });
  } else {
    res.send("Bye");
  }
});

module.exports = router;
