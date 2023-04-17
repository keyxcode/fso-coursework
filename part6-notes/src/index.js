import React from "react";
import ReactDOM from "react-dom/client";
import { createStore, combineReducers } from "redux";
import { Provider } from "react-redux";
import App from "./App";

import noteReducer from "./reducers/noteReducer";
import filterReducer from "./reducers/filterReducer";

const reducer = combineReducers({
  notes: noteReducer,
  filter: filterReducer,
});

const store = createStore(reducer);

console.log(store.getState());

ReactDOM.createRoot(document.getElementById("root")).render(
  // the application's store is given to the Provider by the react-redux library as its attribute store
  <Provider store={store}>
    {/* the application is now defined as a child of a Provider component */}
    <App />
  </Provider>
);
