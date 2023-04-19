import { createContext, useReducer, useContext } from "react";

const counterReducer = (state, action) => {
  switch (action.type) {
    case "INC":
      return state + 1;
    case "DEC":
      return state - 1;
    case "ZERO":
      return 0;
    default:
      return state;
  }
};

const CounterContext = createContext();

export const CounterContextProvider = (props) => {
  // The hook useReducer provides a mechanism to create a state for an application
  // The parameters: the reducer function, and the initial value of the state
  const [counter, counterDispatch] = useReducer(counterReducer, 0);

  return (
    <CounterContext.Provider value={[counter, counterDispatch]}>
      {props.children}
    </CounterContext.Provider>
  );
};

// Custom hooks
export const useCounterValue = () => {
  const counterAndDispatch = useContext(CounterContext);
  return counterAndDispatch[0];
};

export const useCounterDispatch = () => {
  const counterAndDispatch = useContext(CounterContext);
  return counterAndDispatch[1];
};

export default CounterContext;
