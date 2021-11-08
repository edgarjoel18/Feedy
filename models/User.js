const mongoose = require("mongoose");
const Schema = mongoose.Schema; // or const {Schema} = mongoose

const userSchema = new Schema({
  googleId: String,
  credits: { type: Number, default: 0 },
});

mongoose.model("users", userSchema); // we want to create a new collection of users in mongo
