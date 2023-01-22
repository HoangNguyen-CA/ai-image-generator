const AppError = require("../../errorHandling/AppError");
const S3Upload = require("../../services/S3Upload");
const { getUserWithAuthId } = require("../../models/users.model");
const { postUserImage, getUserImages } = require("../../models/images.model");

async function httpGetUser(req, res) {
  const authId = req.auth.payload.sub;
  let user = await getUserWithAuthId(authId);
  res.json({
    user,
  });
}

async function httpPostUserImage(req, res) {
  const authId = req.auth.payload.sub;
  const reqImageURL = req.imageURL;

  const S3imageURL = await S3Upload(reqImageURL);
  await postUserImage(authId, S3imageURL);
  res.status(200).json({
    imageURL: S3imageURL,
  });
}

async function httpGetUserImages(req, res) {
  const authId = req.auth.payload.sub;
  const images = await getUserImages(authId);
  res.status(200).json({
    images: images,
  });
}

module.exports = {
  httpGetUser,
  httpPostUserImage,
  httpGetUserImages,
};
