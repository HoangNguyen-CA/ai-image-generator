const express = require("express");
const openAIRouter = express.Router();
const { httpCreateImage } = require("./openai.controller");
const wrapAsync = require("../../errorHandling/wrapAsync");

openAIRouter.get("/createimage", wrapAsync(httpCreateImage));

module.exports = openAIRouter;
