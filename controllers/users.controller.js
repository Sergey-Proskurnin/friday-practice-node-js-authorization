const User = require("../models/users.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { JWT_SECRET_KEY } = require("../confing");

const {
  OK,
  CONFLICT,
  CREATED,
  BAD_REQUEST,
  UNAUTHORIZED,
} = require("../utils/httpCodes");

const register = async (req, res) => {
  try {
    const { login, password } = req.body;

    const cadidate = await User.findOne({ login: login });
    if (cadidate) {
      return res
        .status(CONFLICT)
        .json({ message: "Users with this login already exist" });
    }

    const salt = bcrypt.genSaltSync(15);
    const hashedPassword = bcrypt.hashSync(password, salt);

    const user = await User.create({ login, password: hashedPassword });

    res.status(CREATED).json(user);
  } catch (error) {
    return res.status(BAD_REQUEST).json({ error: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { login, password } = req.body;
    const cadidate = await User.findOne({ login: login });
    if (!cadidate) {
      return res.status(UNAUTHORIZED).json({ error: "Wrong credentials" });
    }
    const isPasswordCorrect = bcrypt.compareSync(password, cadidate.password);

    if (!isPasswordCorrect) {
      return res.status(UNAUTHORIZED).json({ error: "Wrong credentials" });
    }

    const accessToken = jwt.sign({ id: cadidate._id }, JWT_SECRET_KEY, {
      expiresIn: "15m",
    });
    const refreshToken = jwt.sign(
      { id: cadidate._id, description: "hi mamkin hacker" },
      JWT_SECRET_KEY
    );

    res.status(OK).json({ accessToken, refreshToken });
  } catch (error) {
    return res.status(BAD_REQUEST).json({ error: error.message });
  }
};

module.exports = { register, login };
