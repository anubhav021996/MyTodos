const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");

const Todo = require("../models/todo.model");
const authentication = require("../middlewares/authentication.middleware");
const todoAuthorization = require("../middlewares/todoAuthorization.middleware");

router.post(
  "",
  body("title")
    .notEmpty()
    .withMessage("Title required")
    .bail()
    .isString()
    .withMessage("Invalid title"),
  authentication,
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        let newError = errors
          .array()
          .map((el) => ({ key: el.param, msg: el.msg }));
        return res.status(400).send({ errors: newError });
      }

      req.body.user_id = req.user._id;
      req.body.status = false;

      const todo = await Todo.create(req.body);
      res.status(200).send(todo);
    } catch (e) {
      res.status(500).send(e.message);
    }
  }
);

router.patch("/:id", authentication, todoAuthorization, async (req, res) => {
  try {
    let todo = await Todo.findById(req.params.id);
    todo = await Todo.findByIdAndUpdate(
      req.params.id,
      { status: !todo.status },
      { new: true }
    );
    res.status(200).send(todo);
  } catch (e) {
    res.status(500).send(e.message);
  }
});

router.delete("/:id", authentication, todoAuthorization, async (req, res) => {
  try {
    const todo = await Todo.findByIdAndDelete(req.params.id);
    res.status(200).send(todo);
  } catch (e) {
    res.status(500).send(e.message);
  }
});

router.get("", authentication, async (req, res) => {
  try {
    const todo = await Todo.find({ user_id: req.user._id }).lean().exec();
    res.status(200).send(todo);
  } catch (e) {
    res.status(500).send(e.message);
  }
});

// router.get("/:id",async(req,res)=>{
//     try{
//         const product= await Product.findById(req.params.id).populate("user_id",{businessName:1}).lean().exec();
//         res.status(200).send(product);
//     }
//     catch(e){
//         res.status(500).send(e.message);
//     }
// });

module.exports = router;
