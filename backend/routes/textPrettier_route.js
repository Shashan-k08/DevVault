const express = require("express");
const route = express.Router();
const { formatText } = require("../controllers/textprettierController");

route.post("/format_text", formatText);

module.exports = route;
