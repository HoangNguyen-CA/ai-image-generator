const S3Upload = require("../../services/S3Upload");
const { getUserWithAuthId } = require("../../models/users.model");
const {
  postUserImage,
  getUserImages,
  deleteUserImage,
} = require("../../models/images.model");
const AppError = require("../../errorHandling/AppError");

async function httpGetUser(req, res) {
  const authId = req.auth.payload.sub;
  let user = await getUserWithAuthId(authId);
  res.json({
    user,
  });
}

async function httpPostUserImage(req, res) {
  const authId = req.auth.payload.sub;
  const reqImageURL = req.body?.imageURL;
  const prompt = req.body?.prompt;

  const S3imageURL = await S3Upload(reqImageURL);
  const postedImage = await postUserImage(authId, S3imageURL, prompt);
  res.status(200).json({
    image: postedImage,
  });
}

async function httpDeleteUserImage(req, res) {
  const authId = req.auth.payload.sub;
  const imageId = req.body?.imageId;

  const deletedImage = await deleteUserImage(authId, imageId);

  res.status(200).json({
    image: deletedImage,
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
  httpDeleteUserImage,
};
