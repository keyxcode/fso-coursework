const express = require("express");
// express is a function that is used to create an express application
const app = express();

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

// bind the http server assigned to the app variable to listen to HTTP request sent to port 3001
const PORT = 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
