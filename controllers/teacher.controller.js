const Teacher = require('../models/teacher.model')

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
        const photo = req.file ? req.file.filename : "default-image.png";
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
        
    } catch (error) {
        console.log(error);
    }
}


module.exports = { getTeachers, createTeacher };