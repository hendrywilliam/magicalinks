const mongoose = require("mongoose");

const { Schema } = mongoose;

const linkSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
  },
  user_id: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Link", linkSchema);
