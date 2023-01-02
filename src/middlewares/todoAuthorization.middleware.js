const Todo = require("../models/todo.model");

module.exports = async (req, res, next) => {
  try {
    const todo = await Todo.findById(req.params.id).lean().exec();
    if (req.user._id != todo.user_id)
      return res.status(403).send("Permission denied");
    next();
  } catch (e) {
    console.log(e);
  }
};
