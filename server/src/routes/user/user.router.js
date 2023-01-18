const express = require("express");
const userRouter = express.Router();
const wrapAsync = require("../../errorHandling/wrapAsync");
const checkJWT = require("../../middleware/checkJWT");
const { httpGetUser } = require("./user.controller");

userRouter.get("/", checkJWT, wrapAsync(httpGetUser));

module.exports = userRouter;
