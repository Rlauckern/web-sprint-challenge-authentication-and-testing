exports.seed = function (knex, Promise) {
    return knex("users")
      .truncate()
      .then(function () {
        return knex("users").insert([
          {
            username: "Reed",
            password:
              "$2a$08$AzMESN5tpgbcjvseI7Kff.R4D2BnhBQohpYP1apjU6kmIeDG/f/ha",
          },
          {
            username: "Pickles",
            password:
              "$2a$08$ezPYySo182CGrBWD66Y/LOwnr13lGibJ4HIiEzI.NeuJm5ln.Heta",
          },
        ]);
      });
  };