/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */

const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  name: String,
  passwordHash: String,
  // The ids of the notes are stored within the user document as an array of Mongo ids.
  // The type of the field is ObjectId that references note-style documents.
  notes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Note",
    },
  ],
});

userSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
    // the passwordHash should not be revealed
    delete returnedObject.passwordHash;
  },
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("User", userSchema);
