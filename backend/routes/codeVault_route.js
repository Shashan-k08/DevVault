const express = require("express");
const route = express.Router();
const {
  allSavedCode,
  saveCode,
} = require("../controllers/codeVaultController");

route.post("/devVault/codeVault/saveCode", saveCode);
route.get("/devVault/codeVault/getAllSaved", allSavedCode);
module.exports = route;
