const Teacher = require('../models/teacher.model')
const deletePhoto = require('../helper/delete-photo')
const path = require('path')

const getTeachers = async (req, res) => {
    try {
        const teachers = await Teacher.find().populate('filial')
        res.json(teachers)
    } catch (error) {
        console.log(error);
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
        console.log(error);
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
        console.log(error);
    }
}

const removeTeacher = async (req, res) => {
    try {
        const { id } = req.params;
        const teacher = await Teacher.findByIdAndDelete(id);

        if (!teacher) {
          return res.status(404).json({ message: "Teacher topilmadi!" });
        }

        if (teacher.photo !== "default-image.jpg") {
          const photoPath = path.join(
            __dirname,
            "../uploads/teachers",
            teacher.photo
          );
          deletePhoto(photoPath);
        }

        res.json({ message: "Teacher va rasm o'chirildi!" });
    } catch (error) {
        console.log(error);
    }
}

module.exports = { getTeachers, createTeacher, changeTeacher, removeTeacher };