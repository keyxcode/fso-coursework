import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import store from "./store";
import App from "./App";

ReactDOM.createRoot(document.getElementById("root")).render(
  // the application's store is given to the Provider by the react-redux library as its attribute store
  <Provider store={store}>
    {/* the application is now defined as a child of a Provider component */}
    <App />
  </Provider>
);
