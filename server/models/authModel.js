const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");

const { Schema } = mongoose;

const authSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minLength: [8, "Password must be atleast 8 characters."],
  },
  fname: {
    type: String,
  },
  avatar: {
    type: String,
  },
});

authSchema.statics.signup = async function (email, password, fname) {
  if (!email || !password) throw Error("All field must be filled.");
  if (!validator.isEmail(email)) throw Error("Email is not valid.");
  if (
    !validator.isStrongPassword(password, {
      minLength: 8,
      minLowerCase: 1,
      minUpperCase: 1,
      minNumbers: 1,
      minSymbols: 1,
    })
  )
    throw Error("Password is not strong enough.");

  const isEmailExist = await this.findOne({ email });
  if (isEmailExist) throw Error("Email already in use.");
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  const user = await this.create({
    email,
    password: hash,
    fname: fname,
    avatar: process.env.DEFAULT_PROFILE,
  });
  return user;
};

authSchema.statics.login = async function (email, password) {
  if (!email || !password) throw Error("All field must be filled.");
  const user = await this.findOne({ email });
  if (!user) throw Error("Incorrect email.");
  const checkPass = await bcrypt.compare(password, user.password);
  if (!checkPass) throw Error("Incorrect password.");
  return user;
};

module.exports = mongoose.model("Auth", authSchema);
