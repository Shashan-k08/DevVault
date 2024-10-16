const express = require("express");
const route = express.Router();
const {
  allSavedCode,
  saveCode,
  deleteCode,
} = require("../controllers/codeVaultController");

route.post("/devVault/codeVault/saveCode", saveCode);
route.get("/devVault/codeVault/getAllSaved", allSavedCode);
route.delete("/devVault/codeVault/deleteCode/:id", deleteCode);
module.exports = route;
