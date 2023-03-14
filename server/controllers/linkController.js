const Link = require("../models/linkModel");
const mongoose = require("mongoose");

const addLink = async (req, res) => {
  const { title, link } = req.body;
  if (!title) throw Error("Please provide a title");
  if (!link) throw Error("Please provide a link");
  try {
    const dataLink = await Link.create({
      title,
      link,
      user_id: req.user._id,
    });
    res.status(201).json({
      message: "Link created successfully",
      dataLink,
    });
  } catch (err) {
    console.log(err);
    res.status(401);
  }
};

const getAllLink = async (req, res) => {
  const user_id = req.user._id;
  // is link exist? lets find out🗿
  const links = await Link.find({ user_id });
  res.status(200).json({
    result: links,
  });
};

const deleteLink = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(404)
      .json({ message: "No such data registered in database." });
  }

  const link = await Link.findOneAndDelete({ _id: id });
  if (!link) {
    return res.status(400).json({
      message: "No such data registered in database",
    });
  }
  res.status(200).json(link);
};

module.exports = {
  addLink,
  getAllLink,
  deleteLink,
};
