const express = require("express");
const userRouter = express.Router();
const wrapAsync = require("../../errorHandling/wrapAsync");
const checkJWT = require("../../middleware/checkJWT");
const {
  httpGetUser,
  httpPostUserImage,
  httpGetUserImages,
} = require("./user.controller");

userRouter.get("/", checkJWT, wrapAsync(httpGetUser));

userRouter.get("/images", checkJWT, wrapAsync(httpGetUserImages));

userRouter.post("/images", checkJWT, wrapAsync(httpPostUserImage));

module.exports = userRouter;
