import React from "react";
import ReactDOM from "react-dom/client";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import App from "./App";

import filterReducer from "./reducers/filterReducer";
import noteReducer from "./reducers/noteReducer";

const store = configureStore({
  reducer: {
    notes: noteReducer,
    filter: filterReducer,
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  // the application's store is given to the Provider by the react-redux library as its attribute store
  <Provider store={store}>
    {/* the application is now defined as a child of a Provider component */}
    <App />
  </Provider>
);
