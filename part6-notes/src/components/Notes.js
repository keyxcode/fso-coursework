import { useDispatch, useSelector } from "react-redux";
import { toggleImportanceOf } from "../reducers/noteReducer";

// Note is a presentational component because it's only responsible for rendering
const Note = ({ note, handleClick }) => {
  return (
    <li onClick={handleClick}>
      {note.content}
      <strong> {note.important ? "important" : ""}</strong>
    </li>
  );
};

// Notes is a container component, as it contains some application logic
const Notes = () => {
  // useDispatch() hook provides access to the store.dispatch() function of the Redux store
  const dispatch = useDispatch();

  // useSelector() hook provides access to the store state (in this case a notes array)
  const notes = useSelector((state) => {
    if (state.filter === "ALL") {
      return state.notes;
    }
    return state.filter === "IMPORTANT"
      ? state.notes.filter((note) => note.important)
      : state.notes.filter((note) => !note.important);
  });

  // In other cases, we may do more interesting thing such as:
  //    const importantNotes = useSelector(state => state.filter(note => note.important))

  return (
    <ul>
      {notes.map((note) => (
        <Note
          key={note.id}
          note={note}
          handleClick={() => dispatch(toggleImportanceOf(note.id))}
        />
      ))}
    </ul>
  );
};

export default Notes;
