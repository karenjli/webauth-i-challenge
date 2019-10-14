const express = require("express");
const bcrypt = require("bcryptjs");
const cors = require("cors");

const port = 6500;
const server = express();

const db = require("./data/dbConfig");
const userDb = require("./users/userModel");
server.use(express.json());

server.get("/", (req, res) => {
  res.send("It's working!");
});

server.post("/register", (req, res) => {
  let newUser = req.body;
  const hash = bcrypt.hashSync(newUser.password, 8);
  newUser.password = hash;
  userDb
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

server.post("/login", (req, res) => {
  const { username, password } = req.body;
  userDb
    .findBy({ username })
    .first()
    .then(user => {
      if (username && bcrypt.compareSync(password, user.password)) {
        res.status(200).json({ message: "Login successful" });
      } else {
        res.status(500).json({ message: "Error loging in to server" });
      }
    });
});

server.get("/api/users", auth, (req, res) => {
  userDb
    .find()
    .then(users => {
      res.status(200).json({ users });
    })
    .catch(error => {
      res.status(500).json({ message: "Error fetching credentials" });
    });
});

function auth(req, res, next) {
  const { username, password } = req.headers;
  if (username && password) {
    userDb
      .findBy({ username })
      .first()
      .then(user => {
        console.log(req.headers);
        if (user && bcrypt.compareSync(password, user.password)) {
          next();
        } else {
          res
            .status(401)
            .json({ message: "Username and Password are required" });
        }
      })
      .catch(error => {
        res.status(500).json({ message: "Unexpected error with middleware" });
      });
  } else {
    res.status(401).json({ message: "Username and/or Password is missing" });
  }
}

server.listen(port, () => {
  console.log(`server listening on port ${port}`);
});
