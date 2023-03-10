const { Schema, model } = require("mongoose");

const googleSchema = Schema(
  {
    // схема данных которые может принимать база / строго типизирована
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true, // ??
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
    ip: {
      type: String,
      default: null,
    },
  },
  { versionKey: false, timestamps: true }
);

const Google = model("usergoogle", googleSchema);

module.exports = {
  Google,
};
