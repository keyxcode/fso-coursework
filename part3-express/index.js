require("dotenv").config();
const express = require("express");
const cors = require("cors");
const Note = require("./models/note");

// express is a function that is used to create an express application
const app = express();

// middleware to serve static files like JS, CSS, images from the frontend build
// whenever express gets an HTTP GET request it will first check if the build directory contains a file corresponding to the request's address.
// If a correct file is found, express will return it.
app.use(express.static("build"));

// use json-parser middleware to access the data sent in a request easily
// takes the JSON data of request => transforms to JS object => attaches it to the body of the request object
app.use(express.json());

// Custom middleware to log request info
// In express, middleware is a function that receives 3 params: request object, response object and a next() function
const requestLogger = (request, response, next) => {
  console.log("Method:", request.method);
  console.log("Path:  ", request.path);
  console.log("Body:  ", request.body);
  console.log("---");
  // The next function yields control to the next middleware.
  next();
};
app.use(requestLogger);

// middleware to allow for requests from all origins
app.use(cors());

// The app.get(route, (request, response)) event handler accepts 2 params:
//      The request parameter contains all of the information of the HTTP request.
//      the second response parameter is used to define how the request is responded to.

// defines an event handler that is used to handle HTTP GET requests made to the application's / root
app.get("/", (request, response) => {
  // the request is answered by using the send method of the response object
  // since the parameter is a string, express automatically sets ontent-Type header to text/html.
  response.send("<h1>Hello World!</h1>");
});

// defines an event handler that handles HTTP GET requests made to the notes path of the application
app.get("/api/notes", (request, response) => {
  // express automatically sets the Content-Type header to application/json
  // express also JSON.stringify the notes object automatically

  Note.find({}).then((notes) => {
    response.json(notes);
  });
});

// We can define parameters for routes in express by the colon :syntax
app.get("/api/notes/:id", (request, response, next) => {
  // the id param can be accessed through the request object
  Note.findById(request.params.id)
    .then((note) => {
      if (note) {
        response.json(note);
      } else {
        // handle note doesn't exist
        response.status(404).end();
      }
    })
    // pass any other type of error to error-handling middleware
    .catch((error) => next(error));
});

// route for deleting resources
app.delete("/api/notes/:id", (request, response) => {
  Note.findByIdAndRemove(request.params.id)
    .then((result) => {
      // If deleting is successful, we response with code 204 no content and return no data with the response
      // There's no consensus on what status should be returned if the resource does note exist
      // we could either use 404 or 204. Here we use 204 for simplicity sake
      response.status(204).end();
    })
    .catch((error) => next(error));
});

app.put("/api/notes/:id", (request, response, next) => {
  const body = request.body;

  const note = {
    content: body.content,
    important: body.important,
  };

  // Note that this method receives a regular JavaScript object as its parameter
  // and NOT a new note object created with the Note constructor
  // Also note that we set {new: true} to receive the newly-edited note, instead of the old note by default
  Note.findByIdAndUpdate(request.params.id, note, { new: true })
    .then((updatedNote) => {
      response.json(updatedNote);
    })
    .catch((error) => next(error));
});

// route for adding a note
app.post("/api/notes", (request, response, next) => {
  const body = request.body;

  const note = new Note({
    content: body.content,
    // when the important property is false, this expression returns the false from the right-hand side
    important: body.important || false,
  });

  note
    .save()
    .then((savedNote) => {
      response.json(savedNote);
    })
    .catch((error) => next(error));
});

// This middleware will be used for catching requests made to non-existent routes
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};
app.use(unknownEndpoint);

// This middleware will be used to handle errors. Note that it takes 4 params
// Note that this has to be the last middleware
const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  } else if (error.name === "ValidationError") {
    return response.status(400).json({ error: error.message });
  }

  next(error);
};
app.use(errorHandler);

// bind the http server assigned to the app variable to listen to HTTP request sent to port 3001
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
