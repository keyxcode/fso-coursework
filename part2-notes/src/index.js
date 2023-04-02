import React from "react";
import ReactDOM from "react-dom/client";
import axios from "axios";
import App from "./App";

axios.get("http://localhost:3001/notes").then((res) => {
  console.log(res);

  const notes = res.data;
  console.log(notes);
});

// axios.get("http://localhost:3001/foobar").catch((err) => console.log(err));

const notes = [
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

ReactDOM.createRoot(document.getElementById("root")).render(
  <App notes={notes} />
);
