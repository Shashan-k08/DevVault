const express = require('express');
const otpGenerator = require('otp-generator')
const User = require('../models/User');
const { Otp } = require('../models/Otp');
const router = express.Router();

var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');


var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const fetchuser = require('../middleware/fetchuser')
const JWT_SECRET = "shhhh";
router.post('/createuser', [
  body('name', 'Enter a valid name').isLength({ min: 3 }),
  body('email', 'Enter a valid email').isEmail(),

  body('password', 'Password must be at least 5 characters').isLength({ min: 5 }),
],
  async (req, res) => {
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
        return res.status(400).json({ success, error: "Sorry a user with this email already exist" })
      }
      const temp= async (name, email) => {
        var transporter = nodemailer.createTransport(smtpTransport({
          service: 'gmail',
          host: 'smtp.gmail.com',
          auth: {
            user: 'shashank2110038@akgec.ac.in',
            pass: 'mvqgdfcfnmkfqlay'
            //pass: 'opwkndyvjzvwadhc'
          }
        }));

        var mailOptions = {
          from: 'Shashank',
          to: email,
          subject: "iNotebook",
          html: `Hello <b>${name}</b>, <br>Thank you for Joining Us <br/>We are here to provide best service to you <br/> <br/> <br/><b>Team iNotebook </b>`
        };

        await transporter.sendMail(mailOptions, function (error, info) {
          if (error) {
            console.log(error);
          } else {
            console.log('Email sent: ' + info.response);
          }
        });
        // res.status(200).json({msg:"asdf"}) 
      }
      const salt = await bcrypt.genSalt(10);
      const securePassword = await bcrypt.hash(req.body.password, salt);
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: securePassword,
      });
    
    temp(req.body.name,req.body.email);
      const data = {
        user: {
          id: user.id
        }
      }
      const verificationtoken = jwt.sign(data, JWT_SECRET);

      // .then(user => res.json(user))
      // .catch(err=>{console.log(err)
      // res.json({error:'Please enter a unique value for email'})})
      success = true;
      res.json({ success, verificationtoken });
     
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal server error");
    }
  })

router.post('/login', [
  body('email', 'Enter a valid email').isEmail(),
  body('password', 'Password cannot be blank').exists(),
],
  async (req, res) => {
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
        success = false
        return res.status(400).json({ error: "Please try login with correct crendentials" });
      }

      const passwordcheck = await bcrypt.compare(password, user.password);
      if (!passwordcheck) {
        success = false
        return res.status(400).json({ success, error: "Please try login with correct crendentials" });

      }

      const data = {
        user: {
          id: user.id
        }
      }
      const verificationtoken = jwt.sign(data, JWT_SECRET);
      success = true;
      res.json({ success, verificationtoken });
      const temp = async (name, email) => {
        var transporter = nodemailer.createTransport(smtpTransport({
          service: 'gmail',
          host: 'smtp.gmail.com',
          auth: {
            user: 'shashank2110038@akgec.ac.in',
            pass: 'mvqgdfcfnmkfqlay'
            //pass: 'opwkndyvjzvwadhc'
          }
        }));

        var mailOptions = {
          from: 'Shashank',
          to: email,
          subject: "iNotebook",
          html: `Hello <b>${name}</b>, <br> A new device has logged in into your account <br/> <br/> <br/> Thanks <br/><b>Team iNotebook </b>`
        };

        await transporter.sendMail(mailOptions, function (error, info) {
          if (error) {
            console.log(error);
          } else {
            console.log('Email sent: ' + info.response);
          }
        });
        // res.status(200).json({msg:"asdf"}) 
      }

    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal server error");
    }
  })

// Rout :3 Get logged in User details using :Post "/api/auth/getuser".Login Required

router.post('/getuser', fetchuser, async (req, res) => {
  try {
    userId = req.user.id;
    const user = await User.findById(userId).select("-password")
    res.send(user)

  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error");
  }

})
module.exports = router
