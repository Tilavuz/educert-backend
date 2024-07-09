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
    default:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
  },
  filial: [
    {
      type: Schema.Types.ObjectId,
      ref: "Filial",
    },
  ],
});

module.exports = model("User", userSchema);
