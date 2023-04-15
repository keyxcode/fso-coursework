import React from "react";
import ReactDOM from "react-dom/client";

import { createStore } from "redux";

// A reducer is a function that is given the current state and an action as parameters. It returns a new state.

// The whole state of the application is stored in one JS object in the store
// Actions are objects, which have at least a field determining the type of action
const counterReducer = (state = 0, action) => {
  // switch statement is the most common approach to writing a reducer
  switch (action.type) {
    case "INCREMENT":
      return state + 1;
    case "DECREMENT":
      return state - 1;
    case "ZERO":
      return 0;
    default:
      return state;
  }
};

// Reducer is never supposed to be called directly from the application's code
// It's only given as a parameter to createStore() which creates the store
const store = createStore(counterReducer);

const App = () => {
  return (
    <div>
      {/* App renders the value of the counter by asking it from the store with the method store.getState() */}
      <div>{store.getState()}</div>
      {/* the store uses the reducer to handle actions, which are dispatched to the store with its dispatch() method. */}
      <button onClick={(e) => store.dispatch({ type: "INCREMENT" })}>
        plus
      </button>
      <button onClick={(e) => store.dispatch({ type: "DECREMENT" })}>
        minus
      </button>
      <button onClick={(e) => store.dispatch({ type: "ZERO" })}>zero</button>
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));

const renderApp = () => {
  root.render(<App />);
};

// We have to immediately call the renderApp method. Without the call, the first rendering of the app would never happen.
renderApp();

// subscribe() is used to create callback functions the store calls whenever an action is dispatched to the store
// When the state in the store is changed, React is not able to automatically rerender the application, therefore:
store.subscribe(renderApp);
