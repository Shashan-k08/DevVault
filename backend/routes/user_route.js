const express = require("express");
const route = express.Router();
const { body } = require("express-validator");
const {
  userLogin,
  userInfo,
  createUser,
} = require("../controllers/userController");

route.post(
  "/devVault/createUser",
  [
    body("name", "Enter a valid name").isLength({ min: 3 }),
    body("email", "Enter a valid email").isEmail(),

    body("password", "Password must be at least 5 characters").isLength({
      min: 5,
    }),
  ],
  createUser
);

route.post(
  "/devVault/login",
  [
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password cannot be blank").exists(),
  ],
  userLogin
);
route.post("devVault/getUser", userInfo);

module.exports = route;
