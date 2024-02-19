require("dotenv").config();

const dotenv = require("dotenv");

const express = require("express");
const router = express.Router();
const axios = require("axios");
const uid2 = require("uid2");
const { MD5 } = require("crypto-js");

const apikey = process.env.apiKey;
const privateKey = process.env.privateKey;
const ts = uid2(16);
const hash = MD5(ts + privateKey + apikey);

router.get("/comics", async (req, res) => {
  try {
    let limit;
    let offset;
    if (req.query.limit) {
      limit = req.query.limit;
    } else {
      limit = 100;
    }
    if (req.query.offset) {
      offset = req.query.offset;
    } else {
      offset = 0;
    }

    const response = await axios.get(
      `https://gateway.marvel.com:443/v1/public/comics?orderBy=title&apikey=${apikey}&ts=${ts}&hash=${hash}&offset=${offset}&limit=${limit}`
    );

    res.json(response.data);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get("/comics/search", async (req, res) => {
  let searchInput;
  if (req.query.searchInput) {
    searchInput = req.query.searchInput;
  } else {
    searchInput = "";
  }

  let limit;
  let offset;
  if (req.query.limit) {
    limit = req.query.limit;
  } else {
    limit = 100;
  }
  if (req.query.offset) {
    offset = req.query.offset;
  } else {
    offset = 0;
  }
  try {
    const response = await axios.get(
      `https://gateway.marvel.com:443/v1/public/comics?orderBy=title&titleStartsWith=${searchInput}&apikey=${apikey}&ts=${ts}&hash=${hash}&offset=${offset}&limit=${limit}`
    );

    res.json(response.data);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
