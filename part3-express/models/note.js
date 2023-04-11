/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */

const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema({
  content: {
    // include validation rules
    type: String,
    minLength: 5,
    required: true,
  },
  important: Boolean,
  user: String,
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
