require("dotenv").config()

module.exports = {
  // If using onine database

  development: {
    database: "edducate",
    username: "postgres",
    password: "admin",
    host: "127.0.0.1",
    dialect: "postgres", //hangi databese ile çalıştığın (örnek mysql de olabilirdi)
  },

  /*   test: {
    database: "book_test",
    username: "steven",
    password: "admin",
    host: "127.0.0.1",
    dialect: "postgres",
  }, */

  production: {
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    host: process.env.DB_HOST,
    dialect: 'postgres'
    }
  
}
