import NewNote from "./components/NewNote";
import Notes from "./components/Notes";

const App = () => {
  const filterSelected = (value) => {
    console.log(value);
  };

  return (
    <div>
      <NewNote />
      {/* Since the name attribute of all the radio buttons is the same, they form a button group where only one option can be selected. */}
      <div>
        all{" "}
        <input
          type="radio"
          name="filter"
          onChange={() => filterSelected("ALL")}
        />
        important{" "}
        <input
          type="radio"
          name="filter"
          onChange={() => filterSelected("IMPORTANT")}
        />
        nonimportant{" "}
        <input
          type="radio"
          name="filter"
          onChange={() => filterSelected("NONIMPORTANT")}
        />
      </div>
      <Notes />
    </div>
  );
};

export default App;
