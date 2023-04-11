/* eslint-disable no-underscore-dangle */

// A router object is an isolated instance of middleware and routes.
// You can think of it as a “mini-application,” capable only of performing middleware and routing functions.
// Every Express application has a built-in app router.
const notesRouter = require("express").Router(); // Create a router object

const jwt = require("jsonwebtoken");
const Note = require("../models/note");
const User = require("../models/user");

// defines an event handler that handles HTTP GET requests made to the notes path of the application
notesRouter.get("/", async (request, response) => {
  // express automatically sets the Content-Type header to application/json
  // express also JSON.stringify the notes object automatically

  const notes = await Note.find({}).populate("user", { username: 1, name: 1 });
  response.json(notes);
});

// We can define parameters for routes in express by the colon :syntax
notesRouter.get("/:id", async (request, response) => {
  // the id param can be accessed through the request object
  const note = await Note.findById(request.params.id);
  if (note) {
    response.json(note);
  } else {
    // handle note doesn't exist
    response.status(404).end();
  }
});

const getTokenFrom = (request) => {
  const authorization = request.get("authorization");
  if (authorization && authorization.startsWith("Bearer ")) {
    return authorization.replace("Bearer ", "");
  }
  return null;
};

// route for adding a note
notesRouter.post("/", async (request, response) => {
  console.log(request.headers);
  const { body } = request;

  // If the token is missing or it is invalid, the exception JsonWebTokenError will raised
  const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET);
  if (!decodedToken.id) {
    return response.status(401).json({ error: "token invalid" });
  }

  const user = await User.findById(decodedToken.id);

  const note = new Note({
    content: body.content,
    // when the important property is false, this expression returns the false from the right-hand side
    important: body.important || false,
    user: user.id,
  });

  const savedNote = await note.save();
  user.notes = user.notes.concat(savedNote._id);
  await user.save();

  return response.status(201).json(savedNote);
});

// route for deleting resources
notesRouter.delete("/:id", async (request, response) => {
  await Note.findByIdAndRemove(request.params.id);
  // If deleting is successful, we response with code 204 no content and return no data with the response
  // There's no consensus on what status should be returned if the resource does note exist
  // we could either use 404 or 204. Here we use 204 for simplicity sake
  response.status(204).end();
});

notesRouter.put("/:id", (request, response, next) => {
  const { content, important } = request.body;

  // Note that this method receives a regular JavaScript object as its parameter
  // and NOT a new note object created with the Note constructor
  // Also note that we set {new: true} to receive the newly-edited note, instead of the old note by default
  Note.findByIdAndUpdate(
    request.params.id,
    { content, important },
    // this config lets db validators run
    { new: true, runValidators: true, context: "query" }
  )
    .then((updatedNote) => {
      response.json(updatedNote);
    })
    .catch((error) => next(error));
});

module.exports = notesRouter;
