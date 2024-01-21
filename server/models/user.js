const { Schema, model } = require("mongoose");
const mongoose = require("mongoose");

const User = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, unique: false },
});

module.exports = model("User", User);
