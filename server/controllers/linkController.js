const Link = require("../models/linkModel");

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

module.exports = {
  addLink,
};
