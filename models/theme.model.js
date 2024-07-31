const { Schema, model } = require("mongoose");

const themeSchema = new Schema({
  subjectId: {
    type: Schema.Types.ObjectId,
    ref: "Subject",
    required: true,
  },
  departmentId: {
    type: Schema.Types.ObjectId,
    ref: "Department",
    required: true,
  },
  title: {
    type: String,
    required: true
  }
});

module.exports = model("Theme", themeSchema);
