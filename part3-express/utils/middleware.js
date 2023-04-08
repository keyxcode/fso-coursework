const logger = require("./logger");

// Custom middleware to log request info
// In express, middleware is a function that receives 3 params: request object, response object and a next() function
const requestLogger = (request, response, next) => {
  logger.info("Method:", request.method);
  logger.info("Path:  ", request.path);
  logger.info("Body:  ", request.body);
  logger.info("---");
  // The next function yields control to the next middleware.
  next();
};

// This middleware will be used for catching requests made to non-existent routes
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

// This middleware will be used to handle errors. Note that it takes 4 params
// Note that this has to be the last middleware
const errorHandler = (error, request, response, next) => {
  logger.error(error.message);

  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  }
  if (error.name === "ValidationError") {
    return response.status(400).json({ error: error.message });
  }

  return next(error);
};

module.exports = { requestLogger, unknownEndpoint, errorHandler };
