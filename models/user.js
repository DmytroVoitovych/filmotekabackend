const funcErrorCatch = require("../utils/funcErrorCatch");
const { Schema, model } = require("mongoose");

const userSchema = Schema(
  {
    // схема данных которые может принимать база / строго типизирована
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    token: {
      type: String,
      default: null,
    },
    tokenRefresh: {
      type: String,
      default: null,
    },
    browser: {
      type: String,
      default: null,
    },
    ip: {
      type: String,
      default: null,
    },
    resetCode: {
      type: String,
      default: null,
    },
  },
  { versionKey: false, timestamps: true }
);

userSchema.post("save", funcErrorCatch);
const User = model("user", userSchema);

module.exports = {
  User,
};
