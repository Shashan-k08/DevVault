const express = require("express");
const route = express.Router();
const { formatCode } = require("../controllers/codeFormatterController");

route.post("/format_code", formatCode);

module.exports = route;
