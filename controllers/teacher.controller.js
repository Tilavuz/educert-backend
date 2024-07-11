const Teacher = require('../models/teacher.model')
const WorkTime = require("../models/work-time.model");
const deletePhoto = require('../helper/delete-photo')
const path = require('path')

const getTeachers = async (req, res) => {
    try {
        const teachers = await Teacher.find().populate('filial')
        res.json(teachers)
    } catch (error) {
        res.json({ message: error.message })
    }
}

const getTeachersOneFilial = async (req, res) => {
    try {
        const { id } = req.params
        const teachers = await Teacher.find({ filial: { $in: [id] } });
        res.json(teachers)
    } catch (error) {
        res.json({ message: error.message })
    }
}

const createTeacher = async (req, res) => {
    try {
        const { auth, name, lastname, about, grade, filial } = req.body
        const photo = req.file ? req.file.filename : "default-image.jpg";
        if(!auth || !name || !lastname || !about || !grade || !filial) throw new Error('Malumot to\'liq emas!')

        let teacher = await Teacher.create({ auth, name, lastname, about, grade, filial, photo })

        teacher = await Teacher.findById(teacher._id).populate('filial')
        res.json({ message: 'Teacher yaratildi!', teacher })
    } catch (error) {
        res.json({ message: error.message })
    }
}

const changeTeacher = async (req, res) => {
    try {
        const { id } = req.params
        const { name, lastname, about, grade, filial } = req.body;
        let teacher = await Teacher.findById(id)

        if(!teacher) throw new Error('Malumot topilmadi!')

        if(name) teacher.name = name
        if(lastname) teacher.lastname = lastname
        if(about) teacher.about = about
        if(grade) teacher.grade = grade
        if(filial) teacher.filial = filial

        if (req.file) {
          if (teacher.photo !== "default-image.jpg") {
            const oldPhotoPath = path.join(
              __dirname,
              "../uploads/teachers",
              teacher.photo
            );
            deletePhoto(oldPhotoPath);
          }
          teacher.photo = req.file.filename;
        }

        await teacher.save()
        teacher = await Teacher.findById(id).populate('filial')
        res.json({ message: "Malumot yangilandi!", teacher });
    } catch (error) {
        res.json({ message: error.message })
    }
}

const removeTeacher = async (req, res) => {
    try {
        const { id } = req.params;
        const teacher = await Teacher.findByIdAndDelete(id);

        if (!teacher) throw new Error('Teacher topilmadi!')

        if (teacher.photo !== "default-image.jpg") {
          const photoPath = path.join(
            __dirname,
            "../uploads/teachers",
            teacher.photo
          );
          deletePhoto(photoPath);
        }

        await WorkTime.deleteMany({ teacher: id });
        res.json({ message: "Teacher va rasm o'chirildi!" });
    } catch (error) {
        res.json({ message: error.message })
    }
}

module.exports = {
  getTeachers,
  createTeacher,
  changeTeacher,
  removeTeacher,
  getTeachersOneFilial,
};