const mongoose = require("mongoose");
const config = require("../confing");

const CONNECTION_STRING = config.MONGO_CONNECTION_STRING;

const db = mongoose.connect(CONNECTION_STRING, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = db;
