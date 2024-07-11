const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  auth: {
    type: Schema.Types.ObjectId,
    ref: "Auth",
    default: null,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  photo: {
    type: String,
    default: "default-image.jpg",
  },
  filial: [
    {
      type: Schema.Types.ObjectId,
      default: null,
      ref: "Filial",
      required: true
    },
  ],
});

module.exports = model("User", userSchema);
