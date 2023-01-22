class ErrorHandler {
  async handleError(error, responseStream) {
    console.log(error);
    if (error.isOperational) {
      responseStream
        .status(error.status || 500)
        .json({ error: error.message || "unspecified error" });
    } else {
      process.exit(1);
    }
  }
}

module.exports = new ErrorHandler();
