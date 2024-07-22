const { Schema, model } = require('mongoose')

const teacherTaskSchema = new Schema({
  teacherId: {
    type: Schema.Types.ObjectId,
    ref: "Teacher",
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  task: {
    type: String,
    default: null
  },
});


module.exports = model('TeacherTask', teacherTaskSchema)