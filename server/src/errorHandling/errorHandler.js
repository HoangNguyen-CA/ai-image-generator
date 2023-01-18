class ErrorHandler {
  async handleError(error, responseStream) {
    console.log(error);
    if (error.isOperational) {
      responseStream
        .status(error.status || 500)
        .json({ error: error.message || "unspecified error" });
    } else if (error.status < 500 && error.status >= 400) {
      responseStream.status(error.status).json({
        error: error.error.message,
      });
    }
  }
}

module.exports = new ErrorHandler();
