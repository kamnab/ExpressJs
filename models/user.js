const mongoose = require("mongoose");
// Define a schema
const userSchema = new mongoose.Schema({
  name: String,
  age: Number,
  email: String,
  tweets: [{ type: mongoose.Types.ObjectId, ref: "Tweet" }],
  password: { type: String, require: true },
});
// Create a model
const User = mongoose.model("User", userSchema);
module.exports = User;
