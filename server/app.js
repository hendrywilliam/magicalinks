require("dotenv").config();
const express = require("express");
const log = require("./middlewares/logMiddleware");
const connectToDB = require("./config/dbConfig");
const authRoutes = require("./routes/authRoute");

const app = express();
app.use(express.json());

app.use((req, res, next) => {
  log(req);
  next();
});

app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("Ngab");
});

connectToDB()
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Listening on port: ${process.env.PORT} 🚀`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
