const express = require("express");
const router = express.Router();

const User = require("../Models/user-model");
const uid2 = require("uid2");
const { SHA256 } = require("crypto-js");
const encBase64 = require("crypto-js/enc-base64");

router.post("/user/signin", async (req, res) => {
  try {
    if (
      req.fields.email &&
      req.fields.password &&
      req.fields.password === req.fields.confirmPassword
    ) {
      const userCheck = await User.findOne({ email: req.fields.email });
      const userNameCheck = await User.findOne({
        username: req.fields.username,
      });

      if (userCheck) {
        res.status(400).json({ message: "This email is already used" });
      }
      if (userNameCheck) {
        res.status(400).json({ message: "This username is already used" });
      } else {
        const salt = uid2(16);
        const token = uid2(16);
        const hash = SHA256(req.fields.password + salt).toString(encBase64);

        const newUser = new User({
          email: req.fields.email,
          username: req.fields.username,
          salt: salt,
          hash: hash,
          token: token,
        });
        await newUser.save();

        res.json(newUser);
      }
    } else {
      res.status(400).json({ message: "an error occured" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.post("/user/login", async (req, res) => {
  try {
    const userMailCheck = await User.findOne({ email: req.fields.email });

    if (userMailCheck) {
      const hashToVerify = SHA256(
        req.fields.password + userMailCheck.salt
      ).toString(encBase64);

      if (hashToVerify === userMailCheck.hash) {
        res.json({
          _id: userMailCheck._id,
          email: userMailCheck.email,
          username: userMailCheck.username,
          favoritesComics: userMailCheck.favoritesComics,
          favoritesCharacters: userMailCheck.favoritesCharacters,
          token: userMailCheck.token,
        });
      } else {
        res.status(401).json({ message: "Wrong password" });
      }
    } else {
      res.status(400).json({ message: "This account does not exist" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get("/user/infos", async (req, res) => {
  try {
    const userInfos = await User.findOne({ token: token });
    if (userInfos) {
      res.json(userInfos);
    } else {
      res.status(400).json({ message: "an error occured" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
