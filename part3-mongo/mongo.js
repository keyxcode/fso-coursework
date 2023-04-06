const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log("give password as argument");
  process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://keyxcode:${password}@cluster0.sz9gtfg.mongodb.net/noteApp?retryWrites=true&w=majority`;

// establish db connection
mongoose.set("strictQuery", false);
mongoose.connect(url);

// Define the schema for a note
// this tells Mongoose how the note objects are to be stored in the db
const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean,
});

// Model definition (model name, model schema)
// Convention: use singular capital noun for model name
const Note = mongoose.model("Note", noteSchema);

// Creating an object with help of the Note model
// const note = new Note({
//   content: "Mongoose makes things easy",
//   important: true,
// });

// Saving an object with save() method inherited from the Note object
// this can be chained with an event handler with the then() method
// note.save().then((result) => {
//   console.log("note saved!");
//   // close the db connection (necessary)
//   mongoose.connection.close();
// });

// Fetching objects from the database with the find() method
// If the passed in object is empty => fetch all
Note.find({ content: "CSS is hard" }).then((result) => {
  result.forEach((note) => {
    console.log(note);
  });
  mongoose.connection.close();
});
