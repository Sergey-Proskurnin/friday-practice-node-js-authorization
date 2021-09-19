const { Schema, model } = require("mongoose");
const db = require("../db/connection");

const user = new Schema({
  login: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
});
const User = model("member", user);

module.exports = User;
