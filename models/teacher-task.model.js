const { Schema, model } = require('mongoose')

const teacherTaskSchema = new Schema({
  teacherId: {
    type: Schema.Types.ObjectId,
    ref: "Teacher",
    required: true,
  },
  group: {
    type: Schema.Types.ObjectId,
    ref: 'Group',
    required: true
  },
  title: {
    type: String,
    required: true,
  },
  file: {
    type: String,
    default: null
  },
});


module.exports = model('TeacherTask', teacherTaskSchema)