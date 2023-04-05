// http is Node's built-in web server module
// Node uses a different system of modules called CommonJS module because it had a need for modules long before JS
// Node does support ES6 import/export now but the support is note perfect
// For the moment, it's best to stick to CommonJS modules (require)
const http = require("http");

// Data to offer to the frontend
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

// the createServer() method creates a new web server
// A response event handler is registered to the server that is called everytime an HTTP request is made
const app = http.createServer((request, response) => {
  response.writeHead(200, { "Content-Type": "application/json" });
  response.end(JSON.stringify(notes));
});

// bind the http server assigned to the app variable to listen to HTTP request sent to port 3001
const PORT = 3001;
app.listen(PORT);
console.log(`Server running on port ${PORT}`);
