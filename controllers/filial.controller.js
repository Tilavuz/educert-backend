const Filial = require('../models/filial.model')


const getFilials = async (req, res) => {
    try {
        const filials = await Filial.find()
        res.json(filials)
    } catch (error) {
        console.log(error);
        res.json({ message: 'Server error!' })
    }
}

const createFilial = async (req, res) => {
    try {
        const { title, address } = req.body
        if(!title || !address) throw new Error('Malumot yetarli emas!')
        const filial = await Filial.create({ title, address })
        res.json({ message: 'Filial yaratildi!', filial })
    } catch (error) {
        console.log(error);
        res.json({ message: 'Server error!' })
    }
}

const changeFilial = async (req, res) => {
    try {
        const { id } = req.params
        const { title, address } = req.body
        const filial = await Filial.findById(id)

        if(title) filial.title = title
        if(address) filial.address = address

        await filial.save()
        res.json({ message: 'Filial yangilandi!', filial })
    } catch (error) {
        console.log(error);
    }
}

const removeFilial = async (req, res) => {
    try {
        const { id } = req.params
        const filial = await Filial.findByIdAndDelete(id)
        res.json({ message: 'Filial o\'chirib yuborildi!', filial })
    } catch (error) {
        console.log(error);
    }
}


module.exports = { getFilials, createFilial, changeFilial, removeFilial };