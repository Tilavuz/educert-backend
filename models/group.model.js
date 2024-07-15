const { Schema, model } = require("mongoose");

const groupSchema = new Schema({
  teacher: {
    type: Schema.Types.ObjectId, // teacherni idsi keladi
    ref: "Teacher",
    required: true,
    default: null,
  },
  title: {
    type: String, // guruh nomi
    required: true,
  },
  subject: {
    type: Schema.Types.ObjectId, //qaysi fan
    ref: "Subject",
    required: true,
    default: null,
  },
  filial: {
    type: Schema.Types.ObjectId, // filial id qaysi filialga tegishli
    ref: "Filial",
    required: true,
    default: null,
  }
});

module.exports = model("Group", groupSchema);
