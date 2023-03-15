const Link = require("../models/linkModel");
const Auth = require("../models/authModel");
const mongoose = require("mongoose");

//public ?? 🗿
const getPubLinks = async (req, res) => {
  const { username } = req.params;
  // is the user available? lets find out🗿
  const checkUserAvailability = await Auth.find({ username: username });
  if (!checkUserAvailability) {
    return res.status(404).json({
      message: "No such user registered in database lol",
    });
  }
  const getAllPublicLinks = await Link.find({ username: username });
  res.status(200).json({
    message: "Success obtained all data from database",
    result: getAllPublicLinks,
  });
};

/**
 * this is where protected controllers live emuach
 */
const addLink = async (req, res) => {
  const { title, link } = req.body;
  if (!title) throw Error("Please provide a title");
  if (!link) throw Error("Please provide a link");
  try {
    const { username } = await Auth.findOne({ _id: req.user._id });
    const dataLink = await Link.create({
      title,
      link,
      username,
      user_id: req.user._id,
    });
    res.status(201).json({
      message: "Link created successfully",
      result: dataLink,
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

const updateLink = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({
      message: "No such data registered in database.",
    });
  }
  const link = await Link.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );
  if (!link) {
    return res.status(404).json({
      message: "No such data registered in database",
    });
  }
  return res.status(200).json({
    message: "Data updated succesfully.",
    link,
  });
};

module.exports = {
  addLink,
  getAllLink,
  deleteLink,
  updateLink,
  getPubLinks,
};
