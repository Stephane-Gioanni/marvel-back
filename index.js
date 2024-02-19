require("dotenv").config();

const dotenv = require("dotenv");

const cors = require("cors");
const express = require("express");
const formidable = require("express-formidable");

const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
mongoose.connect(process.env.MONGODB_URI);

const app = express();
app.use(cors());
app.use(formidable());

const characterRoutes = require("./routes/character-routes");
app.use(characterRoutes);
const comicsRoutes = require("./routes/comics-routes");
app.use(comicsRoutes);
const userRoutes = require("./routes/user-routes");
app.use(userRoutes);

app.listen(process.env.PORT, (req, res) => {
  console.log("server has started");
});
