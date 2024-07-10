const { Schema, model } = require("mongoose");

const subjectSchema = new Schema({
  title: {
    type: String, //o'quv yunalish nomi
    required: true,
  },
  filial: {
    type: Schema.Types.ObjectId, // filial id aysi filialga tegishli
    ref: "Filial",
    required: true,
  },
  photo: {
    type: String,
    default: 'default-image.png'
  },
});

module.exports = model("Subject", subjectSchema);
