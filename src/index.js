const express = require("express");
const app = express();
require("dotenv").config();

const connect = require("./configs/db");
const emailController = require("./controllers/email.controller");
const otpController = require("./controllers/otp.controller");
const userController = require("./controllers/user.controller");
const loginController = require("./controllers/login.controller");
const todoController = require("./controllers/todo.controller");

app.use(express.json());

app.use("/email", emailController);
app.use("/otp", otpController);
app.use("/user", userController);
app.use("/login", loginController);
app.use("/todo", todoController);

let port = process.env.PORT || 2548;
app.listen(port, async () => {
  try {
    await connect();
    console.log("Listening");
  } catch (e) {
    console.log(e.message);
  }
});
