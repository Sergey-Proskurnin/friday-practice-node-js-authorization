require("dotenv").config();

const PORT = process.env.PORT;

const MONGO_CONNECTION_STRING = process.env.MONGO_CONNECTION_STRING;

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

module.exports = { PORT, MONGO_CONNECTION_STRING, JWT_SECRET_KEY };
