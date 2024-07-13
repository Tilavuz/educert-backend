const { Schema, model } = require("mongoose");

const studentSchema = new Schema({
  auth: {
    type: Schema.Types.ObjectId,
    ref: "Auth",
    required: true,
    default: null,
  },
  name: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  filial: {
    type: Schema.Types.ObjectId,
    ref: "Filial",
    required: true,
    default: null,
  },
  groups: [
    {
      type: Schema.Types.ObjectId,
      ref: "Group",
      default: null,
      required: true
    }
  ],
  photo: {
    type: String,
    default: "default-image.png",
  },
});



module.exports = model("Student", studentSchema);
