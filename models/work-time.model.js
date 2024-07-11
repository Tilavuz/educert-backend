const { Schema, model } = require('mongoose')


const WorkTimeSchema = new Schema({
  day: {
    type: String,
    required: true,
  },
  start: {
    type: String,
    reuired: true,
  },
  end: {
    type: String,
    reuired: true,
  },
  teacher: {
    type: Schema.Types.ObjectId,
    ref: "Teacher",
    required: true,
    default: null,
  },
});


module.exports = model('WorkTime', WorkTimeSchema)