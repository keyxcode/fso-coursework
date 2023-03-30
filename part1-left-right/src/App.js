import { useState } from "react";

const History = (props) => {
  // Conditional rendering
  if (props.allClicks.length === 0) {
    return <div>the app is used by pressing the buttons</div>;
  }
  return <div>button press history: {props.allClicks.join(" ")}</div>;
};

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>{text}</button>
);

const App = () => {
  // Here we want the component to have 2 pieces of state named left and right, both init to 0
  // Since the component's state can be of any type, we could package both of them in an object
  const [clicks, setClicks] = useState({
    left: 0,
    right: 0,
  });
  const [allClicks, setAll] = useState([]);
  const [total, setTotal] = useState(0);

  const handleLeftClick = () => {
    // The object spread syntax ... creates a new object that has copies of all the props in the original object
    // except the ones we specify
    const newClicks = {
      ...clicks,
      left: clicks.left + 1,
    };
    // It's good practice to not mutate the state directly
    // We should pass in the state already processed
    setClicks(newClicks);

    // It's good practice to use concat() in React instead of push
    // because we don't want to mutate the original array, but return a new one
    setAll(allClicks.concat("L"));

    setTotal(newClicks.left + clicks.right);
  };

  const handleRightClick = () => {
    const newClicks = {
      ...clicks,
      right: clicks.right + 1,
    };
    setClicks(newClicks);
    setAll(allClicks.concat("R"));
    setTotal(clicks.left + newClicks.right);
  };

  return (
    <div>
      {clicks.left}
      <Button handleClick={handleLeftClick} text="left" />
      <Button handleClick={handleRightClick} text="right" />
      {clicks.right}
      <History allClicks={allClicks} />
      <p>{total}</p>
    </div>
  );
};

export default App;
