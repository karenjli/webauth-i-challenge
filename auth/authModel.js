const db = require("../data/dbConfig");

module.exports = { add, find, findBy, findById };

function add(user) {
  return db("credentials")
    .insert(user, "id")
    .then(ids => {
      const [id] = ids;
      return findById(id);
    });
}

function find() {
  return db("credentials").select("id", "username", "password");
}

function findBy(filter) {
  return db("credentials").where(filter);
}

function findById(id) {
  return db("credentials")
    .where({ id })
    .first();
}
