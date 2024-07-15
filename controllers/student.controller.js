const Student = require('../models/student.model')
const deletePhoto = require("../helper/delete-photo");
const path = require("path");
const bcrypt = require("bcrypt");
const Auth = require("../models/auth.model");


const getStudents = async (req, res) => {
    try {
        const students = await Student.find()
          .populate({
            path: "auth",
            select: '-password'
          })
          .populate("filial")
          .populate({
            path: "groups",
            populate: ["subject", "teacher"],
          });
        res.json(students)
    } catch (error) {
        res.json({ message: error.message })
    }
}

const getStudentsGroup = async (req, res) => {
    try {
        const { id } = req.params
        const students = await Student.find({ groups: id })
          .populate({
            path: 'auth',
            select: '-password'
          })
          .populate("filial")
          .populate({
            path: "groups",
            populate: ["subject", "teacher"],
          });
        res.json(students)
    } catch (error) {
        res.json({ message: error.message })
    }
}

const getStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const student = await Student.findOne({ id })
      .populate({
        path: "auth",
        select: "-password",
      })
      .populate("filial")
      .populate({
        path: "groups",
        populate: ["subject", "teacher"],
      });
    res.json(student);
  } catch (error) {
    res.json({ message: error.message });
  }
};

const createStudent = async (req, res) => {
    try {
        const  { auth, name, lastname, filial, groups, password, phone } = req.body
        const photo = req.file ? req.file.filename : 'default-image.png'

        if(!auth || !name || !lastname || !filial || !groups || !password || !phone) throw new Error('Malumot to\'liq emas!')

          let hashPassword;
          if (password) {
            const salt = await bcrypt.genSalt(10);
            hashPassword = await bcrypt.hash(password, salt);
          }

          let authschema = await Auth.create({
            phone,
            password: hashPassword,
            role: "student",
          });

        let student = await Student.create({
          auth: authschema,
          name,
          lastname,
          filial,
          groups,
          photo,
        });
        student = await Student.findById(student._id)
          .populate({
            path: 'auth',
            select: '-password'
          })
          .populate("filial")
          .populate({
            path: "groups",
            populate: ["subject", "teacher"],
          });
        res.json({ message: 'Student yaratildi!', student })
    } catch (error) {
        res.json({ message: error.message })
    }
}

const changeStudent = async (req, res) => {
    try {
        const { id } = req.params
        const { name, lastname, filial, groups, password, phone } = req.body
        let student = await Student.findById(id)

        if(!student) throw new Error('Talaba topilmadi!')

          let auth = await Auth.findOne({ phone })

        if(name) student.name = name
        if(lastname) student.lastname = lastname
        if(filial) student.filial = filial
        if(groups) student.groups = groups
        if(password) auth.password = password
        if(phone) auth.phone = phone


        if(req.file) {
            if(student.photo !== 'default-image.png') {
                const oldPhotoPath = path.join(__dirname, '../uploads/students', student.photo)
                deletePhoto(oldPhotoPath)
            }
            student.photo = req.file.filename
        }
        await student.save()
        student = await Student.findById(id)
          .populate({
            path: 'auth',
            select: '-password'
          })
          .populate("filial")
          .populate({
            path: "groups",
            populate: ["subject", "teacher"],
          });
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


module.exports = {
  getStudents,
  createStudent,
  changeStudent,
  removeStudent,
  getStudentsGroup,
  getStudent,
};