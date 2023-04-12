const NoteForm = ({ onSubmit, value, handleChange }) => (
  <form onSubmit={onSubmit}>
    <input value={value} onChange={handleChange} />
    <button type="submit">save</button>
  </form>
);

export default NoteForm;
