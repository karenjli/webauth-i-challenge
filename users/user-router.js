const router = require("express").Router();
const auth = require("./protected-middleware");
const userDb = require("./userModel");

router.get("/", auth, (req, res) => {
  userDb
    .find()
    .then(users => {
      res.status(200).json({ users });
    })
    .catch(error => {
      res.status(500).json({ message: "Error fetching credentials" });
    });
});

module.exports = router;
