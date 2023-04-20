import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // Routing is used by placing components as children of the Router component, meaning inside Router tags.
  // Under the hood, it uses HTML5 history API
  <Router>
    <App />
  </Router>
);
