const knex = require("knex")({
  client: "mysql2",
  connection: {
    host: "localhost",
    port: 3306,
    user: "root",
    password: "mysql-secret",
    database: "time",
  },
});

module.exports = { knex };
