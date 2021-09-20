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

    const candidate = await User.findOne({ login: login });
    if (candidate) {
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
    const candidate = await User.findOne({ login: login });
    if (!candidate) {
      return res.status(UNAUTHORIZED).json({ error: "Wrong credentials" });
    }
    const isPasswordCorrect = bcrypt.compareSync(password, candidate.password);

    if (!isPasswordCorrect) {
      return res.status(UNAUTHORIZED).json({ error: "Wrong credentials" });
    }

    const accessToken = jwt.sign({ id: candidate._id }, JWT_SECRET_KEY, {
      expiresIn: "30m",
    });
    const refreshToken = jwt.sign(
      { id: candidate._id, description: "hi mamkin hacker" },
      JWT_SECRET_KEY
    );
    await User.updateOne({ _id: candidate._id }, { refreshToken, accessToken });
    const user = await User.findOne({ login: login });
    res.status(OK).json({ user });
  } catch (error) {
    return res.status(BAD_REQUEST).json({ error: error.message });
  }
};

const refresh = async (req, res) => {
  try {
    const { refreshToken, login } = req.body;
    const user = await User.findOne({ login: login });
    if (!user) {
      return res.status(BAD_REQUEST).json({ error: "Bad request" });
    }
    if (refreshToken !== user.refreshToken) {
      return res.status(BAD_REQUEST).json({ error: "Bad request" });
    }

    const accessToken = jwt.sign({ id: user._id }, JWT_SECRET_KEY, {
      expiresIn: "10m",
    });
    const newRefreshToken = jwt.sign(
      { id: user._id, description: "hi mamkin hacker" },
      JWT_SECRET_KEY
    );
    await User.updateOne(
      { _id: user._id },
      { refreshToken: newRefreshToken, accessToken }
    );
    const updateUser = await User.findOne({ login: login });
    res.status(OK).json({ updateUser });
  } catch (error) {}
};

module.exports = { register, login, refresh };
