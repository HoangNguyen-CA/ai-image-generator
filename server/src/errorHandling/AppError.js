class AppError extends Error {
  constructor(status, message, isOperational = true) {
    super();
    this.status = status;
    this.message = message;
    this.isOperational = isOperational;
  }
}

module.exports = AppError;
