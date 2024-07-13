const Student = require('../models/student.model')
const deletePhoto = require("../helper/delete-photo");
const path = require("path");


const getStudents = async (req, res) => {[]
    try {
        const students = await Student.find().populate("filial").populate({
          path: "groups",
          populate: {
            path: 'subject'
          }
        });
        res.json(students)
    } catch (error) {
        res.json({ message: error.message })
    }
}

const createStudent = async (req, res) => {
    try {
        const  { auth, name, lastname, filial, groups } = req.body
        const photo = req.file ? req.file.filename : 'default-image.png'

        if(!auth || !name || !lastname || !filial || !groups) throw new Error('Malumot to\'liq emas!')

        let student = await Student.create({ auth, name, lastname, filial, groups, photo })
        student = await Student.findById(student._id).populate('filial').populate('groups')
        res.json({ message: 'Student yaratildi!', student })
    } catch (error) {
        res.json({ message: error.message })
    }
}

const changeStudent = async (req, res) => {
    try {
        const { id } = req.params
        const { name, lastname, filial, groups } = req.body
        let student = await Student.findById(id)

        if(!student) throw new Error('Talaba topilmadi!')

        if(name) student.name = name
        if(lastname) student.lastname = lastname
        if(filial) student.filial = filial
        if(subjects) student.subjects = subjects
        if(groups) student.groups = groups

        if(req.file) {
            if(student.photo !== 'default-image.png') {
                const oldPhotoPath = path.join(__dirname, '../uploads/students', student.photo)
                deletePhoto(oldPhotoPath)
            }
            student.photo = req.file.filename
        }
        await student.save()
        student = await Student.findById(id).populate('filial').populate('groups')
        res.json({ message: 'Student o\'zgartirildi!', student })
    } catch (error) {
        res.json({ message: error.message })
    }
}

const removeStudent = async (req, res) => {
    try {
        const { id } = req.params
        const student = await Student.findByIdAndDelete(id)

        if (!student) throw new Error("Student topilmadi!");

        if (student.photo !== "default-image.png") {
          const photoPath = path.join(
            __dirname,
            "../uploads/students",
            student.photo
          );
          deletePhoto(photoPath);
        }

        res.json({ message: 'Student o\'chirib yuborildi!', student })
    } catch (error) {
        res.json({ message: error.message })
    }
}


module.exports = { getStudents, createStudent, changeStudent, removeStudent };