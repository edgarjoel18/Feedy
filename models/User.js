const mongoose = require("mongoose");
const Schema = mongoose.Schema; // or const {Schema} = mongoose

const userSchema = new Schema({
  googleId: String,
});

mongoose.model("users", userSchema); // we want to create a new collection of users in mongo
