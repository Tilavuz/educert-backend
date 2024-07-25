const deletePhoto = require('../helper/delete-photo')
const TeacherTask = require('../models/teacher-task.model')
const Group = require("../models/group.model");
const path = require('path')


const createTask = async (req, res) => {
    try {
        const { title, group } = req.body
        const file = req.file.filename
        const teacherId = req.user._id
        if(!title) throw new Error('Malumot to\'liq emas!')
        const task = await TeacherTask.create({
          title,
          file,
          teacherId,
          group,
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
        const tasks = await TeacherTask.find()
        res.json(tasks)
    } catch (error) {
        res.json({ message: error.message })
    }
}

const getTeacherGroup = async (req, res) => {
    try {
        const groups = await Group.find()
        res.json(groups)
    } catch (error) {
        res.json({ message: error.message })
    }
}


module.exports = { createTask, deleteTask, getTasks, getTeacherGroup };