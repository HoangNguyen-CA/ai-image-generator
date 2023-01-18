const AppError = require("../../errorHandling/AppError");

async function httpGetUser(req, res) {
  res.json({
    auth: req.auth,
    message:
      "Hello from a private endpoint! You need to be authenticated to see this.",
  });
}

module.exports = {
  httpGetUser,
};
