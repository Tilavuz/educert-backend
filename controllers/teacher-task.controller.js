const deletePhoto = require('../helper/delete-photo')
const TeacherTask = require('../models/teacher-task.model')
const Group = require("../models/group.model");
const Auth = require("../models/auth.model");
const Teacher = require("../models/teacher.model");
const path = require('path')


const createTask = async (req, res) => {
    try {
        const { title } = req.body
        const {id} = req.params
        const file = req.file.filename
        const teacher = await Teacher.findOne({ auth: req.user._id });
        if(!title) throw new Error('Malumot to\'liq emas!')
        const task = await TeacherTask.create({
          title,
          file,
          teacherId: teacher._id,
          group: id,
        });
        res.json({ message: 'Vazifa yuklandi!', task })
    } catch (error) {
        res.json({ message: error.message })
    }
}

const deleteTask = async (req, res) => {
    try {
        const { id } = req.params
        const task = await TeacherTask.findByIdAndDelete(id)

        if(task.file) {
            const deleteFilePath = path.join(__dirname, '../uploads', task.file)
            deletePhoto(deleteFilePath)
        }

        res.json({ message: 'Vazifa o\'chirildi!' })
    } catch (error) {
        res.json({ message: error.message })
    }
}

const getTasks = async (req, res) => {
    try {
        const auth = await Auth.findById(req.user._id);
        const teacher = await Teacher.findOne({ auth: auth._id })
        const tasks = await TeacherTask.find({ teacherId: teacher._id }).populate('group')
        res.json(tasks)
    } catch (error) {
        res.json({ message: error.message })
    }
}

const getTasksGroup = async (req, res) => {
  try {
    const { id } = req.params
    const auth = await Auth.findById(req.user._id);
    const teacher = await Teacher.findOne({ auth: auth._id });
    const tasks = await TeacherTask.find({
      teacherId: teacher._id,
      group: id,
    }).populate({
      path: "group",
      populate: 'subject'
    });
    res.json(tasks);
  } catch (error) {
    res.json({ message: error.message });
  }
};


const getTeacherGroup = async (req, res) => {
    try {
        const groups = await Group.find()
        res.json(groups)
    } catch (error) {
        res.json({ message: error.message })
    }
}


module.exports = {
  createTask,
  deleteTask,
  getTasks,
  getTeacherGroup,
  getTasksGroup,
};