const bcrypt = require("bcryptjs");
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("credentials")
    .del()
    .then(function() {
      const password1 = bcrypt.hashSync("wubs", 8);
      const password2 = bcrypt.hashSync("jwb", 8);
      // Inserts seed entries
      return knex("credentials").insert([
        { id: 1, username: "ken", password: password1 },
        { id: 2, username: "jessy", password: password2 },
      ]);
    });
};
