const express = require("express");
const CodeVault = require("../models/codeVault.modal");

const saveCode = async (req, res) => {
  console.log("hi");
  const { title, language, description, code } = req.body;
  console.log(title);
  try {
    const newCodeEntry = new CodeVault({
      title,
      language,
      description,
      code,
    });

    const savedEntry = await newCodeEntry.save();
    const codeEntries = await CodeVault.find();
    res.json({ success: true, data: codeEntries });
    console.log(savedEntry);
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

const allSavedCode = async (req, res) => {
  try {
    const codeEntries = await CodeVault.find();
    res.json({ success: true, data: codeEntries });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
const deleteCode = async (req, res) => {
  try {
    const code = await CodeVault.findById(req.params.id);
    if (!code) {
      return res.status(401).send("Not allowed");
    }
    await CodeVault.findByIdAndDelete(req.params.id);
    const codeEntries = await CodeVault.find();
    res.json({
      Success: "Code has been deleted Successfully!",
      data: codeEntries,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal server error");
  }
};

module.exports = { saveCode, allSavedCode, deleteCode };
