const { Schema, model } = require("mongoose");

const roomSchema = new Schema({
  filial: {
    type: Schema.Types.ObjectId,
    ref: "Filial",
    required: true,
    default: null,
  },
  number: {
    type: String,
    required: true,
  },
});

module.exports = model("Room", roomSchema);
