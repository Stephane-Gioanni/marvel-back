const mongoose = require("mongoose");

const User = mongoose.model("User", {
  email: {
    unique: true,
    type: String,
  },
  username: {
    unique: true,
    type: String,
  },
  password: String,
  favoritesComics: Array,
  favoritesCharacters: Array,
  salt: String,
  hash: String,
  token: String,
});

module.exports = User;
