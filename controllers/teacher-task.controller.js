const deletePhoto = require('../helper/delete-photo')
const TeacherTask = require('../models/teacher-task.model')
const path = require('path')


const createTask = async (req, res) => {
    try {
        const { title } = req.body
        const file = req.file.filename
        const teacherId = req.user._id
        if(!title) throw new Error('Malumot to\'liq emas!')
        const task = await TeacherTask.create({ title, file, teacherId })
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
        res.json({  })
    }
}


module.exports = { createTask, deleteTask };