/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */
require("dotenv").config();

const mongoose = require("mongoose");

mongoose.set("strictQuery", false);

const url = process.env.MONGODB_URI;

console.log("connecting to", url);

mongoose
  .connect(url)
  .then(() => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log("error connecting to MongoDB:", error.message);
  });

const noteSchema = new mongoose.Schema({
  content: {
    // include validation rules
    type: String,
    minLength: 5,
    required: true,
  },
  important: Boolean,
});

// Use the toJSON method to format the returned objects of this schema
noteSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    // Transform the default id object to string and add that property to the returned object
    returnedObject.id = returnedObject._id.toString();

    // Remove unwanted properties
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Note", noteSchema);
