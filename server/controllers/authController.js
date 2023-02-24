const Auth = require("../models/authModel");

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await Auth.login(email, password);
    res.status(200).json({
      message: "Sukses login boskue",
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
    res.status(201).json({
      message: "Success created an account",
      email,
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
