const jwt = require("jsonwebtoken");

function createToken(_id, secret) {
  return jwt.sign({ _id }, secret, { expiresIn: "1d" });
}

module.exports = createToken;
