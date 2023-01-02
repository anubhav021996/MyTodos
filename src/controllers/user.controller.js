const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const Authentication = require("../middlewares/authentication.middleware");
const User = require("../models/user.model");

const { welcomeMail, adminMail, resetMail } = require("../utilis");

const newToken = (user) => jwt.sign({ user }, process.env.screatKey);

router.get("", Authentication, async (req, res) => {
  try {
    const id = req.user._id;
    const user = await User.findById(id).lean().exec();
    res.status(200).send(user);
  } catch (e) {
    res.status(500).send(e.message);
  }
});

router.post(
  "",
  body("name")
    .notEmpty()
    .withMessage("Name required")
    .bail()
    .isString()
    .withMessage("Invalid Name"),
  body("password")
    .notEmpty()
    .withMessage("Password Required")
    .bail()
    .isStrongPassword()
    .withMessage("Password should be Strong"),
  Authentication,
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        let newErrors = errors
          .array()
          .map((el) => ({ key: el.param, msg: el.msg }));
        return res.status(400).send({ errors: newErrors });
      }
      req.body.email = req.user.email;

      let user = await User.findOne({ email: req.body.email }).lean().exec();
      if (user) return res.status(400).send("User already exists");

      user = await User.create(req.body);

      const token = newToken(user);

      welcomeMail(user);
      adminMail(user);
      res.status(200).send({ token });
    } catch (e) {
      res.status(500).send(e.message);
    }
  }
);

router.patch(
  "/reset",
  body("password")
    .notEmpty()
    .withMessage("Password required")
    .bail()
    .isStrongPassword()
    .withMessage("Password should be strong"),
  Authentication,
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        let newErrors = errors
          .array()
          .map((el) => ({ key: el.param, msg: el.msg }));
        return res.status(400).send({ errors: newErrors });
      }

      req.body.email = req.user.email;

      let user = await User.findOne({ email: req.body.email });
      user.password = req.body.password;
      await user.save();
      const token = newToken(user);
      resetMail(user);
      res.status(200).send({ token });
    } catch (e) {
      res.status(500).send(e.message);
    }
  }
);

module.exports = router;
