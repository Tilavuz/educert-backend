const { Schema, model } = require("mongoose");

const teacherSchema = new Schema({
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
  about: {
    type: String,
  },
  grade: {
    type: String,
    required: true,
  },
  filial: [
    {
      type: Schema.Types.ObjectId,
      default: null,
      ref: "Filial",
      required: true,
    },
  ]
});


module.exports = model("Teacher", teacherSchema);
