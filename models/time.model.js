const { Schema, model } = require("mongoose");

const timeSchema = new Schema({
  filial: {
    type: Schema.Types.ObjectId,
    ref: "Filial",
    default: null,
    required: true,
  },
  start: {
    type: String,
    required: true,
  },
  end: {
    type: String,
    required: true,
  },
  day: {
    type: String,
    required: true,
    enum: [
      "dushanba",
      "seshanba",
      "chorchanba",
      "payshanba",
      "juma",
      "shanba",
      "yakshanba",
    ],
  },
});

module.exports = model("Time", timeSchema);
