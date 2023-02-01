const { query } = require("../services/postgres");
const { getUserWithAuthId } = require("./users.model");
const AppError = require("../errorHandling/AppError");

async function postUserImage(authId, imageURL, prompt) {
  const user = await getUserWithAuthId(authId);

  const res = await query(
    "INSERT INTO images (image_url, user_id, prompt) VALUES ($1, $2, $3) RETURNING *",
    [imageURL, user.user_id, prompt]
  );

  return res.rows[0];
}

async function deleteUserImage(authId, imageId) {
  const user = await getUserWithAuthId(authId);

  const res = await query(
    "DELETE FROM images WHERE user_id = $1 AND image_id = $2 RETURNING *",
    [user.user_id, imageId]
  );

  if (res.rows.length === 0) {
    throw new AppError(
      400,
      `Image with ID ${imageId} and user ${user.user_id} does not exist.`
    );
  }

  return res.rows[0];
}

async function getUserImages(authId) {
  const user = await getUserWithAuthId(authId);

  const res = await query("SELECT * FROM images WHERE user_id = $1", [
    user.user_id,
  ]);

  return res.rows;
}

module.exports = { postUserImage, getUserImages, deleteUserImage };
