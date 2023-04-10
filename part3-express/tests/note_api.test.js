const mongoose = require("mongoose");
const supertest = require("supertest");
const helper = require("./test_helper");
const app = require("../app");
const Note = require("../models/note");

const api = supertest(app);

// beforeEach() is used to initialize the db before each test
beforeEach(async () => {
  await Note.deleteMany({});
  let noteObject = new Note(helper.initialNotes[0]);
  await noteObject.save();
  noteObject = new Note(helper.initialNotes[1]);
  await noteObject.save();
}, 100000);

test("notes are returned as json", async () => {
  await api
    .get("/api/notes")
    .expect(200)
    .expect("Content-Type", /application\/json/);
});

test("all notes are returned", async () => {
  const response = await api.get("/api/notes");

  // note that this expect() method is from jest itself
  // unlike the .expect() method in the block above which is from supertest
  expect(response.body).toHaveLength(helper.initialNotes.length);
});

test("a specific note is within the returned notes", async () => {
  const response = await api.get("/api/notes");

  const contents = response.body.map((r) => r.content);
  expect(contents).toContain("Browser can execute only JavaScript");
});

test("a valid note can be added", async () => {
  const newNote = {
    content: "async/await simplifies making async calls",
    important: true,
  };

  await api
    .post("/api/notes")
    .send(newNote)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const notesAtTheEnd = await helper.notesInDb();
  expect(notesAtTheEnd).toHaveLength(helper.initialNotes.length + 1);

  const contents = notesAtTheEnd.map(n => n.content)
  expect(contents).toContain("async/await simplifies making async calls");
});

test("note without content is not added", async () => {
  const newNote = {
    important: true,
  };

  await api.post("/api/notes").send(newNote).expect(400);

  const notesAtTheEnd = await helper.notesInDb();
  expect(notesAtTheEnd).toHaveLength(helper.initialNotes.length);
});

// afterAll() function of Jest is used to close the connect to the db after the tests
// note that this function might not run if we run a single test
afterAll(async () => {
  await mongoose.connection.close();
});
