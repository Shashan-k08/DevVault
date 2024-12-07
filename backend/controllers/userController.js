const User = require("../models/User");
var bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
const sendMail = require("../utils/mailer");
const JWT_SECRET = process.env.JWT_SECRET;
const { validationResult } = require("express-validator");
const createUser = async (req, res) => {
  let success = false;
  // if there are errors then check error and rwturn bad request and that error
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success, errors: errors.array() });
  }
  // check weather user with this email already exist
  try {
    let user = await User.findOne({ email: req.body.email });
    console.log(user);
    if (user) {
      return res.status(400).json({
        success,
        error: "Sorry a user with this email already exist",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const securePassword = await bcrypt.hash(req.body.password, salt);
    user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: securePassword,
    });

    sendMail(
      req.body.email,
      "Welcome on DevVault",
      `Hello <b>${req.body.name}</b>, <br>Thank you for Joining Us <br/>We are here to provide best service to you <br/> <br/> <br/><b>Team DevVault </b>`
    );
    const data = {
      user: {
        id: user.id,
      },
    };
    const verificationtoken = jwt.sign(data, JWT_SECRET);
    const userResponse = user.toObject();
    delete userResponse.password;
    success = true;
    res.json({ success, verificationtoken, user: userResponse });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error");
  }
};

const userLogin = async (req, res) => {
  let success = false;
  // if there are errors then check error and rwturn bad request and that error
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (!user) {
      success = false;
      return res
        .status(400)
        .json({ error: "Please try login with correct crendentials" });
    }

    const passwordcheck = await bcrypt.compare(password, user.password);
    if (!passwordcheck) {
      success = false;
      return res.status(400).json({
        success,
        error: "Please try login with correct crendentials",
      });
    }

    sendMail(
      req.body.email,
      "New login",
      `Hello <b>${req.body.name}</b>, <br> A new device has logged in into your account <br/> <br/> <br/> Thanks <br/><b>Team DevVault </b>`
    );
    const data = {
      user: {
        id: user.id,
      },
    };
    const verificationtoken = jwt.sign(data, JWT_SECRET);
    const userResponse = user.toObject();
    delete userResponse.password;

    success = true;
    res.json({ success, verificationtoken, user: userResponse });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error");
  }
};
const userInfo = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    res.send(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error");
  }
};
module.exports = { createUser, userLogin, userInfo };
