const { query } = require("../services/postgres");
const AppError = require("../errorHandling/AppError");

async function registerUser(authId) {
  const res = await query(
    "INSERT INTO users (auth_id) VALUES ($1) RETURNING *",
    [authId]
  );
  return res.rows[0];
}

// lazy register users in database, allows for no corrupt state
async function getUserWithAuthId(authId) {
  let user = null;
  const res = await query("SELECT * FROM users WHERE auth_id = $1", [authId]);
  if (res.rows.length > 0) {
    user = res.rows[0];
  }
  if (user === null) {
    user = await registerUser(authId);
  }
  if (user === null) {
    throw new AppError(500, "User is null after registration.", false);
  }
  return user;
}

module.exports = {
  getUserWithAuthId,
};
