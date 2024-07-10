const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  auth: {
    type: Schema.Types.ObjectId,
    ref: "Auth",
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
    default: 'default-image.jpg'
  },
  filial: [
    {
      type: Schema.Types.ObjectId,
      ref: "Filial",
    },
  ],
});

module.exports = model("User", userSchema);
