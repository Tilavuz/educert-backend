const TimeModel = require('../models/time.model')


const getTimes = async (req, res) => {
    try {
        const times = await TimeModel.find().populate('filial')
        res.json(times)
    } catch (error) {
        res.json({ message: error.message })
    }
}

const getFilialTimes = async (req, res) => {
  try {
    const { id } = req.params
    const times = await TimeModel.find({ filial: id }).populate("filial");
    res.json(times);
  } catch (error) {
    res.json({ message: error.message });
  }
};

const createTime = async (req, res) => {
    try {
        const { start, end, filial, day } = req.body
        if(!start || !end || !filial || !day) throw new Error('Malumot to\'liq emas!')

        const isHaveTime = await TimeModel.findOne({ start, end, filial, day })
        if(isHaveTime) throw new Error('Bunday malumot mavjut!')

        let time = await TimeModel.create({ start, end, filial, day })

        time = await TimeModel.findById(time._id).populate('filial')

        res.json({ message: "Malumot yaratildi!", time })
    } catch (error) {
        res.json({ message: error.message })
    }
}

const changeTime = async (req, res) => {
    try {
        const { id } = req.params
        const { start, end, filial, day } = req.body

        if (!start || !end || !filial || !day) throw new Error("Malumot to'liq emas!");

        let time = await TimeModel.findById(id)
        if(!time) throw new Error('Malumot topilmadi!')

        const isHaveTime = await TimeModel.findOne({ start, end, filial, day });
        if (isHaveTime) throw new Error("Bunday malumot mavjut!");

        if(start) time.start = start
        if(end) time.end = end
        if(filial) time.filial = filial
        if (day) time.day = day;

        await time.save()
        time = await TimeModel.findById(id).populate('filial')
        res.json({ message: 'Malumot yangilandi!', time })
    } catch (error) {
        res.json({ message: error.message })
    }
}

const removeTime = async (req, res) => {
    try {
        const { id } = req.params
        await TimeModel.findByIdAndDelete(id)
        res.json({ message: "Malumot o\'chirildi!" })
    } catch (error) {
        res.json({ message: error.message })
    }
}


module.exports = {
  getTimes,
  createTime,
  changeTime,
  removeTime,
  getFilialTimes,
};