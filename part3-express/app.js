const express = require("express");

const app = express(); // express is a function that is used to create an express application

require("express-async-errors");
const cors = require("cors");
const mongoose = require("mongoose");
const config = require("./utils/config");
const notesRouter = require("./controllers/notes");
const usersRouter = require("./controllers/users");
const middleware = require("./utils/middleware");
const logger = require("./utils/logger");

mongoose.set("strictQuery", false);

logger.info("connecting to", config.MONGODB_URI);

mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    logger.info("connected to MongoDB");
  })
  .catch((error) => {
    logger.info("error connecting to MongoDB:", error.message);
  });

// middleware to allow for requests from all origins
app.use(cors());

// middleware to serve static files like JS, CSS, images from the frontend build
// whenever express gets an HTTP GET request it will first check if the build directory contains a file corresponding to the request's address.
// If a correct file is found, express will return it.
app.use(express.static("build"));

// use json-parser middleware to access the data sent in a request easily
// takes the JSON data of request => transforms to JS object => attaches it to the body of the request object
app.use(express.json());

app.use(middleware.requestLogger);

app.use("/api/notes", notesRouter);
app.use("/api/users", usersRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
