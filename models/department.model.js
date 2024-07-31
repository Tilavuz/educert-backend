const { Schema, model } = require("mongoose");

const departmentSchema = new Schema({
  subjectId: {
    type: Schema.Types.ObjectId,
    ref: "Subject",
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
});

module.exports = model("Department", departmentSchema);
