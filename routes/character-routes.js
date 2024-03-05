require("dotenv").config();

const dotenv = require("dotenv");

const express = require("express");
const router = express.Router();
const axios = require("axios");
const uid2 = require("uid2");
const { MD5 } = require("crypto-js");

const apiKey = process.env.apiKey;
const privateKey = process.env.privateKey;
const ts = uid2(16);
const hash = MD5(ts + privateKey + apiKey);

router.get("/characters", async (req, res) => {
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
      `https://gateway.marvel.com:443/v1/public/characters?orderBy=name&apikey=${apiKey}&ts=${ts}&hash=${hash}&offset=${offset}&limit=${limit}`
    );
    res.json(response.data);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get("/characters/search", async (req, res) => {
  console.log(req.query);

  try {
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
    const response = await axios.get(
      `https://gateway.marvel.com:443/v1/public/characters?orderBy=name&nameStartsWith=${searchInput}&apikey=${apiKey}&ts=${ts}&hash=${hash}&offset=${offset}&limit=${limit}`
    );

    res.json(response.data);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get("/character/:id/comics", async (req, res) => {
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
      `https://gateway.marvel.com:443/v1/public/characters/${req.params.id}/comics?apikey=${apiKey}&ts=${ts}&hash=${hash}&offset=${offset}&limit=${limit}`
    );

    res.json(response.data);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get("/character/:id", async (req, res) => {
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
      `https://gateway.marvel.com:443/v1/public/characters/${req.params.id}?apikey=${apiKey}&ts=${ts}&hash=${hash}&offset=${offset}&limit=${limit}`
    );

    res.json(response.data);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
