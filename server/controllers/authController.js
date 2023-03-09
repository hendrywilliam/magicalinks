require("dotenv").config();
const Auth = require("../models/authModel");
const createToken = require("../utils/jwtUtils");

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await Auth.login(email, password);
    const token = createToken(user._id, process.env.SECRET_JWT);
    res.status(200).json({
      message: "Login succesfully.",
      token,
    });
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
};

const register = async (req, res) => {
  const { email, password, fname } = req.body;

  try {
    const user = await Auth.signup(email, password, fname);
    const token = createToken(user._id, process.env.SECRET_JWT);
    res.status(201).json({
      message: "Success created an account",
      email,
      token,
    });
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
};

module.exports = {
  login,
  register,
};
