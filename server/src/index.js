const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const errorHandler = require("./errorHandling/errorHandler");
const AppError = require("./errorHandling/AppError");
if (process.env.NODE_ENV !== "production") require("dotenv").config();

const app = express();

const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(morgan("tiny"));

app.use("/openai", require("./routes/openai/openai.router"));
app.use("/user", require("./routes/user/user.router"));

app.use((err, req, res, next) => {
  if (err?.status == 401) {
    console.log(err);

    next(new AppError(401, "User not authorized."));
  } else {
    next(err);
  }
});

app.use((err, req, res, next) => {
  errorHandler.handleError(err, res);
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
