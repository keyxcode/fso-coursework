import { createSlice } from "@reduxjs/toolkit";

const noteSlice = createSlice({
  // The name parameter defines the prefix which is used in the action's type values
  // this is to avoid naming collision
  name: "notes",
  initialState: [],
  reducers: {
    createNote(state, action) {
      // Redux Toolkit makes it possible to mutate the state argument inside the reducer
      state.push(action.payload);
    },
    toggleImportanceOf(state, action) {
      const id = action.payload;
      const noteToChange = state.find((n) => n.id === id);
      const changedNote = {
        ...noteToChange,
        important: !noteToChange.important,
      };

      console.log(JSON.parse(JSON.stringify(state)));

      return state.map((note) => (note.id !== id ? note : changedNote));
    },
    appendNote(state, action) {
      state.push(action.payload);
    },
    setNotes(state, action) {
      return action.payload;
    },
  },
});

// createSlice() returns an object containing the reducer as well as the action creators defined by the reducers parameter
export const { createNote, toggleImportanceOf, appendNote, setNotes } =
  noteSlice.actions;
export default noteSlice.reducer;
