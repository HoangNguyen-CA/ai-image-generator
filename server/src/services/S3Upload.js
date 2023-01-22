const s3 = require("./S3");
const uuid = require("uuid");
const AppError = require("../errorHandling/AppError");

async function S3Upload(imageURL) {
  try {
    const res = await fetch(imageURL);
    const buffer = await res.arrayBuffer();
    const blob = new Uint8Array(buffer);

    const uploadedImage = await s3
      .upload({
        Bucket: process.env.AWS_S3_BUCKET_NAME,
        Key: uuid.v4(),
        Body: blob,
      })
      .promise();

    return uploadedImage.Location;
  } catch (e) {
    throw new AppError(400, `Could not upload user image (${imageURL}) to S3.`);
  }
}

module.exports = S3Upload;
