const funcErrorCatch = require("../utils/funcErrorCatch");
const { Schema, model } = require("mongoose");

const filmsSchema = Schema(
  {
    // схема данных которые может принимать база / строго типизирована
    type: {
      type: String,
      required: [true, "Type is required"],
      enum: ["watched", "queue"], // обовязково для орієнтира групи
    },
    idFilm: {
      type: Number,
      required: [true, "Id is required"],
    },
    owner: {
      // власники основи
      type: Schema.Types.ObjectId,
      ref: "user", // название колекции
    },
    ownerGoogle: {
      // власники гуглові
      type: Schema.Types.ObjectId,
      ref: "usergoogle", // название колекции
    },
    date: {
      type: String,
    },
    time: {
      type: String,
    },
  },
  { versionKey: false, timestamps: true }
);

filmsSchema.post("save", funcErrorCatch);
const Action = model("film", filmsSchema); // створюємо модель яка формує колекцію

module.exports = {
  Action,
};
