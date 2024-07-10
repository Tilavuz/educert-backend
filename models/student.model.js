const { Schema, model } = require("mongoose");

const studentSchema = new Schema({
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
  filial: {
    type: Schema.Types.ObjectId,
    ref: "Filial",
    required: true,
  },
  subjects: [
    {
      type: Schema.Types.ObjectId,
      ref: "Subject",
    },
  ],
  groups: [
    {
      type: Schema.Types.ObjectId,
      ref: "Group",
    },
  ],
  photo: {
    type: String,
    default: 'default-image.png'
  },
});



module.exports = model("Student", studentSchema);
