const { BAD_REQUEST } = require("../utils/httpCodes");
const jwt = require("jsonwebtoken");
const { JWT_SECRET_KEY } = require("../confing");
const e = require("express");

const validateToken = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(BAD_REQUEST).json({ error: "Token was not provide" });
  }
  try {
    jwt.verify(token, JWT_SECRET_KEY);
  } catch (error) {
    return res.status(BAD_REQUEST).json({ error: error.message });
  }
  next();
};

module.exports = validateToken;
