const express = require("express");
const cors = require("cors");

const helmet = require("helmet");
const sessions = require("express-session");

const authRouter = require("../auth/auth-router");
const userRouter = require("../users/user-router");
const server = express();

const sessionConfiguration = {
  name: "cookie",
  secret: "This is a secret",
  cookie: {
    httpOnly: false,
    maxAge: 1000 * 60 * 60,
    secure: false,
  },
  resave: false,
  saveUninitialized: false,
};

//global middleware
server.use(sessions(sessionConfiguration));
server.use(helmet());
server.use(express.json());
server.use(cors());

server.use("/api/auth", authRouter);
server.use("/api/users", userRouter);
server.get("/", (req, res) => {
  res.send("It's working!");
});
module.exports = server;
