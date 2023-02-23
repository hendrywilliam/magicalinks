require("dotenv").config();
const mongoose = require("mongoose");

const connectToDB = async () => {
  mongoose.set("strictQuery", true);
  const db = await mongoose.connect(process.env.MONG_URI);
  return db;
};

module.exports = connectToDB;
