/* eslint-disable no-underscore-dangle */

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const loginRouter = require("express").Router();
const User = require("../models/user");

loginRouter.post("/", async (request, response) => {
  const { username, password } = request.body;

  const user = await User.findOne({ username });
  const passwordCorrect =
    user === null ? false : await bcrypt.compare(password, user.passwordHash);

  if (!(user && passwordCorrect)) {
    return response.status(401).json({
      error: "invalid username or password",
    });
  }

  const userForToken = {
    username: user.username,
    id: user._id,
  };

  // If the password is correct, a token is created with the method jwt.sign()
  // The token contains the username and the user id in a digitally signed form
  const token = jwt.sign(
    userForToken,
    process.env.SECRET,
    // token expires in 60*60 seconds, that is, in one hour
    { expiresIn: 60 * 60 }
  );

  return response
    .status(200)
    .send({ token, username: user.username, name: user.name });
});

module.exports = loginRouter;
