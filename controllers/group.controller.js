const Group = require('../models/group.model')


const getGroups = async (req, res) => {
    try {
        const groups = await Group.find().populate('filial').populate('teacher').populate('subject')
        res.json(groups)
    } catch (error) {
        res.json({ message: error.message })
    }
}

const createGroup = async (req, res) => {
    try {
        const { teacher, title, subject, filial } = req.body
        const isHaveGroup = await Group.findOne({ filial, teacher, title, subject })

        if(!teacher || !title || !!subject || !filial) throw new Error('Malumot to\'liq emas')
        if(isHaveGroup) throw new Error('Bunday guruh mavjut!')

        let group = await Group.create({ teacher, title, subject, filial })
        group = await Group.findById(group._id).populate('filial').populate('teacher').populate('subject')
        res.json({ message: 'Guruh yaratildi!', group })
    } catch (error) {
        res.json({ message: error.message })
    }
}

const changeGroup = async (req, res) => {
    try {
        const { id } = req.params
        const { filial, teacher, title, subject } = req.body
        let group = await Group.findById(id)

        if(!group) throw new Error('Guruh topilmadi!')

        if(filial) group.filial = filial
        if(teacher) group.teacher = teacher
        if(title) group.title = title
        if(subject) group.subject = subject

        await group.save()

        group = await Group.findById(id).populate('filial').populate('teacher').populate('subject')
        res.json({ message: 'Malumot yangilandi!', group })
    } catch (error) {
        res.json({ message: error.message })
    }
}

const removeGroup = async (req, res) => {
    try {
        const { id } = req.params
        await Group.findByIdAndDelete(id)
        res.json({ message: 'Malumot o\'chirildi' })
    } catch (error) {
        res.json({ message: error.message })
    }
}


module.exports = { getGroups, createGroup, changeGroup, removeGroup };