const express = require("express");
// express is a function that is used to create an express application
const app = express();

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

let notes = [
  {
    id: 1,
    content: "HTML is easy",
    important: true,
  },
  {
    id: 2,
    content: "Browser can execute only JavaScript",
    important: false,
  },
  {
    id: 3,
    content: "GET and POST are the most important methods of HTTP protocol",
    important: true,
  },
  { id: 4, content: "test", important: true },
];

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
  response.json(notes);
});

// We can define parameters for routes in express by the colon :syntax
app.get("/api/notes/:id", (request, response) => {
  // the id param can be accessed through the request object
  // be careful with the typing here, the returned param is type string
  const id = Number(request.params.id);
  const note = notes.find((note) => note.id === id);

  // Remember to correctly handle the request status if there's an error
  if (note) {
    response.json(note);
  } else {
    response.status(404).end();
  }
});

// route for deleting resources
app.delete("/api/notes/:id", (request, response) => {
  const id = Number(request.params.id);
  notes = notes.filter((note) => note.id !== id);

  // If deleting is successful, we response with code 204 no content and return no data with the response
  // There's no consensus on what status should be returned if the resource does note exist
  // we could either use 404 or 204. Here we use 204 for simplicity sake
  response.status(204).end();
});

// Helper function to create note id on the server
const generateId = () => {
  const maxId = notes.length > 0 ? Math.max(...notes.map((n) => n.id)) : 0;
  return maxId + 1;
};

// route for adding a note
app.post("/api/notes", (request, response) => {
  const body = request.body;

  if (!body.content) {
    // note that return is crucial so that the function doesn't go on to save the bad note
    return response.status(400).json({
      error: "content missing",
    });
  }

  const note = {
    ...body,
    // when the important property is false, this expression returns the false from the right-hand side
    important: body.important || false,
    id: generateId(),
  };

  notes = notes.concat(note);

  response.json(note);
});

// This middleware will be used for catching requests made to non-existent routes
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

app.use(unknownEndpoint);

// bind the http server assigned to the app variable to listen to HTTP request sent to port 3001
const PORT = 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
