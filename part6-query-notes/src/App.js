import { useQuery, useMutation, useQueryClient } from "react-query";
import { getNotes, createNote, updateNote } from "./requests";

const App = () => {
  const queryClient = useQueryClient();

  // useMutatation() creates an object that can modify data stored on the server
  // The argument is: a fetching function
  const newNoteMutation = useMutation(createNote, {
    // // if the mutation is success, this will update a query with the key notes
    // onSuccess: () => {
    //   queryClient.invalidateQueries("notes");
    // },

    // an optimized way of retrieving new data
    // manually update the query state
    onSuccess: (newNote) => {
      const notes = queryClient.getQueryData("notes");
      queryClient.setQueryData("notes", notes.concat(newNote));
    },
  });

  const addNote = async (event) => {
    event.preventDefault();
    const content = event.target.note.value;
    event.target.note.value = "";

    // the mutation object's mutate() function performs the mutation
    // it takes a note as a parameter
    newNoteMutation.mutate({ content, important: true });
  };

  const updateNoteMutation = useMutation(updateNote, {
    onSuccess: () => {
      queryClient.invalidateQueries("notes");
    },
  });

  const toggleImportance = (note) => {
    updateNoteMutation.mutate({ ...note, important: !note.important });
  };

  // The return value of useQuery() is an object that indicates the status of the query
  // When the request is completed, the component is rendered again.
  // The arguments are: a string key, and a data fetching function
  const result = useQuery("notes", getNotes, {
    // this option disables GET request each time an element of the UI changes
    refetchOnWindowFocus: false,
  });
  console.log(result);

  if (result.isLoading) {
    return <div>loading data...</div>;
  }

  const notes = result.data;

  return (
    <div>
      <h2>Notes app</h2>
      <form onSubmit={addNote}>
        <input name="note" />
        <button type="submit">add</button>
      </form>
      {notes.map((note) => (
        <li key={note.id} onClick={() => toggleImportance(note)}>
          {note.content}
          <strong> {note.important ? "important" : ""}</strong>
        </li>
      ))}
    </div>
  );
};

export default App;
