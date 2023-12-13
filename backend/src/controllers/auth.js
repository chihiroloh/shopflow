const UserModel = require("../models/Auth");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");

const getAllUsers = async (req, res) => {
  try {
    const users = await UserModel.find();

    const outputArray = users.map((user) => ({
      username: user.username,
      isAdmin: user.isAdmin,
    }));
    res.json(outputArray);
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ status: "error", msg: "error getting users" });
  }
};

const register = async (req, res) => {
  try {
    const user = await UserModel.findOne({ username: req.body.username });
    if (user) {
      return res
        .status(400)
        .json({ status: "error", msg: "duplicate username" });
    }
    const hash = await bcrypt.hash(req.body.password, 12);
    await UserModel.create({
      username: req.body.username,
      password: hash,
      isAdmin: req.body.isAdmin || false,
    });
    res.json({ status: "ok", msg: "user created" });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ status: "error", msg: "invalid registration" });
  }
};

const login = async (req, res) => {
  try {
    const user = await UserModel.findOne({ username: req.body.username });
    if (!user) {
      return res.status(400).json({ status: "error", msg: "not authorised" });
    }

    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) {
      return res.status(401).json({ status: "error", msg: "login failed" });
    }

    const claims = {
      id: user._id,
      username: user.username,
      isAdmin: user.isAdmin,
    };

    const access = jwt.sign(claims, process.env.ACCESS_SECRET, {
      expiresIn: "20m",
      jwtid: uuidv4(),
    });

    const refresh = jwt.sign(claims, process.env.REFRESH_SECRET, {
      expiresIn: "30d",
      jwtid: uuidv4(),
    });

    res.json({ access, refresh });
  } catch (error) {
    console.log(error.message);
    return res.status(400).json({ status: "error", msg: "login failed" });
  }
};

const refresh = (req, res) => {
  try {
    const decoded = jwt.verify(req.body.refresh, process.env.REFRESH_SECRET);
    const claims = {
      username: decoded.username,
      isAdmin: decoded.isAdmin,
    };
    const access = jwt.sign(claims, process.env.ACCESS_SECRET, {
      expiresIn: "20m",
      jwtid: uuidv4(),
    });
    res.json({ access });
  } catch (error) {
    console.log(error.message);
    res
      .status(400)
      .json({ status: "error", msg: "refreshing token unsuccessful" });
  }
};

module.exports = { getAllUsers, register, login, refresh };
