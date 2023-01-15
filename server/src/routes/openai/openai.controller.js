const { Configuration, OpenAIApi } = require("openai");
const AppError = require("../../errorHandling/AppError");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_KEY,
});
const openai = new OpenAIApi(configuration);

async function httpCreateImage(req, res) {
  const { prompt, size } = req.body;
  if (prompt === undefined)
    throw new AppError(400, "Empty prompt in request body");

  let sizeText = "256x256";
  if (size == "medium") {
    sizeText = "512x512";
  } else if (size == "large") {
    sizeText = "1024x1024";
  }

  try {
    const apiResponse = await openai.createImage({
      prompt: prompt,
      n: 1,
      size: sizeText,
    });
    const imageUrl = apiResponse.data.data[0].url;
    res.status(200).json({
      success: true,
      data: imageUrl,
    });
  } catch (openaiError) {
    if (openaiError.response) {
      throw new AppError(
        openaiError.response.status,
        openaiError.response.data.error.message
      );
    } else {
      throw new AppError(400, openaiError.message);
    }
  }
}

module.exports = {
  httpCreateImage,
};
