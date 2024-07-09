const { Schema, model } = require("mongoose");

const filialSchema = new Schema({
  title: {
    type: String, 
    required: true,
  },
  address: {
    type: String, 
    required: true,
  },
});

module.exports = model("Filial", filialSchema);
