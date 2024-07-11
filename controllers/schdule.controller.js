const Schdule = require("../models/schdule.model");

const getSchdules = async (req, res) => {
  try {
    const schdules = await Schdule.find()
      .populate("filial")
      .populate("time")
      .populate("teacher")
      .populate("room")
      .populate("group")
      .populate("subject");
    res.json(schdules);
  } catch (error) {
    res.json({ message: error.message });
  }
};

const createSchdule = async (req, res) => {
  try {
    const { filial, time, teacher, room, group, subject } = req.body;

    if (!filial || !time || !teacher || !room || !group || !subject)
      throw new Error("Malumot yetarli emas!");

    let isHaveSchdule = await Schdule.find({ filial, time, teacher });
    if (isHaveSchdule) throw new Error("Bu vaqtda ustoz bant!");

    isHaveSchdule = await Schdule.find({ filial, time, room });
    if (isHaveSchdule) throw new Error("Bu vaqtda xona bant!");

    isHaveSchdule = await Schdule.find({ filial, time, group });
    if (isHaveSchdule) throw new Error("Bu vaqtda guruh bant!");

    let schdule = await Schdule.create({
      filial,
      time,
      teacher,
      room,
      group,
      subject,
    });
    schdule = await Schdule.findById(schdule._id)
      .populate("filial")
      .populate("time")
      .populate("teacher")
      .populate("room")
      .populate("group")
      .populate("subject");
    res.json({ message: "Malumot yaratildi!", schdule });
  } catch (error) {
    res.json({ message: Error.message });
  }
};

const changeSchdule = async (req, res) => {
  try {
    const { id } = req.params
    const { filial, time, teacher, room, group, subject } = req.body;

    let schdule = await Schdule.findById(id)

    if(!schdule) throw new Error('Malumot mavjut emas!')

    if (!filial || !time || !teacher || !room || !group)
      throw new Error("Malumot yetarli emas!");

    let isHaveSchdule = await Schdule.find({ filial, time, teacher });
    if (isHaveSchdule) throw new Error("Bu vaqtda ustoz bant!");

    isHaveSchdule = await Schdule.find({ filial, time, room });
    if (isHaveSchdule) throw new Error("Bu vaqtda xona bant!");

    isHaveSchdule = await Schdule.find({ filial, time, group });
    if (isHaveSchdule) throw new Error("Bu vaqtda guruh bant!");

    if(subject) schdule.subject = subject
    if(filial && time && teacher && room && group) {
      schdule.filial = filial
      schdule.time = time
      schdule.teacher = teacher
      schdule.group = group
    }
    await schdule.save()
    res.json({ message: 'Malumot yangilandi!', schdule })
  } catch (error) {
    res.json({ message: error.message });
  }
};

const removeSchdule = async (req, res) => {
  try {
    const { id } = req.params
    await Schdule.findByIdAndDelete(id)
    res.json({ message: 'Malumot o\'chirildi!' })
  } catch (error) {
    res.json({ message: error.message })
  }
}

module.exports = { getSchdules, createSchdule, changeSchdule, removeSchdule };
