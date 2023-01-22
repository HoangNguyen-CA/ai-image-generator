const { Pool } = require("pg");
const AppError = require("../errorHandling/AppError");
const errorHandler = require("../errorHandling/errorHandler");

if (process.env.NODE_ENV !== "production") require("dotenv").config();

const pool = new Pool({
  user: process.env.PGUSER || "postgres",
  password: process.env.PGPASSWORD || "password",
  host: process.env.PGHOST || "localhost",
  port: process.env.PGPORT || 5432,
  database: process.env.PGDATABASE || "postgres",
});

pool.on("error", (err, client) => {
  errorHandler.handleError(
    new AppError(500, "Unexpected database error on idle client.", false)
  );
});

function query(text, params) {
  try {
    return pool.query(text, params);
  } catch (e) {
    throw new AppError(500, `Query (${text}) could not be executed.`, false);
  }
}

module.exports = {
  query,
};
