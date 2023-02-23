const fs = require("node:fs");
const path = require("node:path");

const log = async (req) => {
  const fp = path.join("./", "log.txt");
  const dt = `${new Date().toLocaleString()} — ${req.method} request on ${
    req.url
  } \n`;
  await fs.appendFile(fp, dt, () => {
    return;
  });
};

module.exports = log;
