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
    default:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
  },
});

module.exports = model("Subject", subjectSchema);
