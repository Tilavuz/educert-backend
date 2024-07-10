const deletePhoto = require('../helper/delete-photo')
const User = require('../models/user.model')
const path = require('path')

const getUsers = async (req, res) => {
    try {
        const users = await User.find().populate('filial')
        res.json(users)
    } catch (error) {
        res.json({ message: error.message })
    }
}

const createUser = async (req, res) => {
    try {
        const { auth, name, lastname, filial } = req.body
        const photo = req.file ? req.file.filename : 'default-image.jpg'
        if(!auth || !name || !lastname || !filial) throw new Error('Malumot yetarli emas!')
        let user = await User.create({ auth, name, lastname, photo, filial})
        user = await User.findById(user._id).populate('filial')
        res.json({ message: "User yaratildi", user })
    } catch (error) {
        res.json({ message: error.message })
    }
}

const changeUser = async (req, res) => {
    try {
        const { id } = req.params
        const { name, lastname, filial } = req.body
        let user = await User.findById(id)
        
        if(!user) throw new Error('Malumot topilmadi!')

        if(name) user.name = name
        if(lastname) user.lastname = lastname
        if(filial) user.filial = filial

        if(req.file) {
            if(user.photo !== 'default-image.jpg') {
                const oldPhotoPath = path.join(__dirname, '../uploads/users', user.photo)
                deletePhoto(oldPhotoPath)
            }
            user.photo = req.file.filename
        }

        await user.save()
        user = await User.findById(id).populate('filial')
        res.json({ message: "User yangilandi!", user })

    } catch (error) {
        res.json({ message: error.message })
    }
}

const removeUser = async (req, res) => {
    try {
        const { id } = req.params
        const user = await User.findByIdAndDelete(id)

        if(!user) throw new Error('User topilmadi!')

        if(user.photo !== 'default-image.jpg') {
            const oldImagePath = path.join(__dirname, '../uploads/users', user.photo)
            deletePhoto(oldImagePath)
        }
        res.json({ message: 'User o\'chirib yuborildi!' })

    } catch (error) {
        res.json({ message: error.message })
    }
}


module.exports = { getUsers, createUser, changeUser, removeUser };