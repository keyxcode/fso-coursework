import { useState } from "react";

import {
  Routes,
  Route,
  Link,
  Navigate,
  useParams,
  useNavigate,
  useMatch,
} from "react-router-dom";

const Home = () => (
  <div>
    <h2>TKTL notes app</h2>
    <p>
      Lorem Ipsum is simply dummy text of the printing and typesetting industry.
      Lorem Ipsum has been the industry's standard dummy text ever since the
      1500s, when an unknown printer took a galley of type and scrambled it to
      make a type specimen book. It has survived not only five centuries, but
      also the leap into electronic typesetting, remaining essentially
      unchanged. It was popularised in the 1960s with the release of Letraset
      sheets containing Lorem Ipsum passages, and more recently with desktop
      publishing software like Aldus PageMaker including versions of Lorem
      Ipsum.
    </p>
  </div>
);

const Note = ({ note }) => {
  // // Use useParams() to extract the parameterized :id
  // const id = useParams().id;
  // const note = notes.find((n) => n.id === Number(id));

  return (
    <div>
      <h2>{note.content}</h2>
      <div>{note.user}</div>
      <div>
        <strong>{note.important ? "important" : ""}</strong>
      </div>
    </div>
  );
};

const Notes = ({ notes }) => (
  <div>
    <h2>Notes</h2>
    <ul>
      {notes.map((note) => (
        <li key={note.id}>
          {/* The ability to click a name is implemented with the component Link */}
          <Link to={`/notes/${note.id}`}>{note.content}</Link>
        </li>
      ))}
    </ul>
  </div>
);

const Users = () => (
  <div>
    <h2>TKTL notes app</h2>
    <ul>
      <li>Matti Luukkainen</li>
      <li>Juha Tauriainen</li>
      <li>Arto Hellas</li>
    </ul>
  </div>
);

const Login = (props) => {
  const navigate = useNavigate();

  const onSubmit = (event) => {
    event.preventDefault();
    props.onLogin("mluukkai");
    // Use useNavigate() to change the browser's URL programmatically
    // In this case, go back to the Home page
    navigate("/");
  };

  return (
    <div>
      <h2>login</h2>
      <form onSubmit={onSubmit}>
        <div>
          username: <input />
        </div>
        <div>
          password: <input type="password" />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  );
};

const App = () => {
  const [notes, setNotes] = useState([
    {
      id: 1,
      content: "HTML is easy",
      important: true,
      user: "Matti Luukkainen",
    },
    {
      id: 2,
      content: "Browser can execute only JavaScript",
      important: false,
      user: "Matti Luukkainen",
    },
    {
      id: 3,
      content: "Most important methods of HTTP-protocol are GET and POST",
      important: true,
      user: "Arto Hellas",
    },
  ]);

  const [user, setUser] = useState(null);

  // Every time the component is rendered, so practically every time the browser's URL changes, the following command is executed
  // If the URL matches /notes/:id, the match variable will contain an object
  // from which we can access the parameterized part of the path, the id of the note to be displayed,
  const match = useMatch("/notes/:id");
  // we can then fetch the correct note to display.
  const note = match
    ? notes.find((note) => note.id === Number(match.params.id))
    : null;

  const login = (user) => {
    setUser(user);
  };

  const padding = {
    padding: 5,
  };

  return (
    <div>
      {/* Inside the router, we define links that modify the address bar with the Link component. */}
      <div>
        <Link style={padding} to="/">
          home
        </Link>
        <Link style={padding} to="/notes">
          notes
        </Link>
        <Link style={padding} to="/users">
          users
        </Link>
        {user ? (
          <em>{user} logged in</em>
        ) : (
          <Link style={padding} to="/login">
            login
          </Link>
        )}
      </div>

      {/* The Routes works by rendering the first component whose path matches the URL in the browser's address bar. */}
      {/* Components rendered based on the URL of the browser are defined with the component Route. */}
      <Routes>
        {/* We define parameterized URLs in the routing in App component as follows */}
        <Route path="/notes/:id" element={<Note note={note} />} />
        <Route path="/notes" element={<Notes notes={notes} />} />
        {/* If a user isn't logged in, redirect using the component Navigate */}
        <Route
          path="/users"
          element={user ? <Users /> : <Navigate replace to="/login" />}
        />
        <Route path="/login" element={<Login onLogin={login} />} />
        <Route path="/" element={<Home />} />
      </Routes>
      <footer>
        <br />
        <em>Note app, Department of Computer Science 2023</em>
      </footer>
    </div>
  );
};

export default App;
