import ReactDOM from "react-dom/client";
import App from "./App";
import { CounterContextProvider } from "./CounterContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  // Providing the context to any child component to avoid prop drilling
  <CounterContextProvider>
    <App />
  </CounterContextProvider>
);
