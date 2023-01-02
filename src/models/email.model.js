const mongoose = require("mongoose");

const emailSchema = new mongoose.Schema(
  {
    email: { type: String, required: true },
    otp: { type: Number, required: true },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = mongoose.model("emails", emailSchema);
