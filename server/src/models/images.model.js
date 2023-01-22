const { query } = require("../services/postgres");
const { getUserWithAuthId } = require("./users.model");
const AppError = require("../errorHandling/AppError");

async function postUserImage(authId, imageURL) {
  const user = getUserWithAuthID(authId);

  const res = query(
    "INSERT INTO images (image_url, user_id) VALUES ($1, $2) RETURNING *",
    [imageURL, user.user_id]
  );

  return res.rows[0];
}

async function getUserImages(authId) {
  const user = getUserWithAuthID(authId);

  const res = await query("SELECT * FROM images WHERE user_id = $1", [
    user.user_id,
  ]);

  return res.rows;
}

module.exports = { postUserImage, getUserImages };
