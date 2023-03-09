const fs = require("node:fs");
const path = require("node:path");

const log = async (req, res, next) => {
  const fp = path.join("./", "log.txt");
  const dt = `${new Date().toLocaleString()} — ${req.method} request on ${
    req.url
  } \n`;
  await fs.appendFile(fp, dt, () => {
    return;
  });
  next();
};

module.exports = log;
