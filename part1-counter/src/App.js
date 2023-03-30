import { useState } from "react";

// Good practice: lift the state up
// => place the app state in the closest common ancestor (here's it's App)
// and pass it down to child components through props
const Display = ({ counter }) => <div>{counter}</div>;

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>{text}</button>
);

const App = () => {
  // The useState() function call adds state to the component and renders it initialized with the value passed in (here's 0)
  // it returns an array of 2 items:
  //    * a variable assigned the initial value of state
  //    * a function to modify the state
  // Use the destructuring assignment syntax to get these 2 items
  const [counter, setCounter] = useState(0);

  // whenever the setCounter() function is called, the state is changed and React re-renders the component
  // which means the entire function body of the component function gets executed
  const increaseByOne = () => setCounter(counter + 1);
  const decreaseByOne = () => setCounter(counter - 1);
  const resetToZero = () => setCounter(0);

  return (
    <div>
      <Display counter={counter} />
      <Button handleClick={increaseByOne} text="plus" />
      <Button handleClick={decreaseByOne} text="minus" />
      <Button handleClick={resetToZero} text="reset" />
    </div>
  );
};

export default App;
