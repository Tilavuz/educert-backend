const Theme = require("../models/theme.model");
const Group = require("../models/group.model");

const getThemes = async (req, res) => {
  try {
    const { id } = req.params;
    const themes = await Theme.find({ departmentId: id });
    res.json(themes);
  } catch (error) {
    res.json({ message: error.message });
  }
};

const getGroupThemes = async (req, res) => {
  try {
    const { id } = req.params;
    const group = await Group.findById(id)
    const themes = await Theme.find({ subjectId: group.subject }).populate('departmentId')
    res.json(themes);
  } catch (error) {
    res.json({ message: error.message });
  }
};

const createTheme = async (req, res) => {
  try {
    const { subjectId, departmentId, title } = req.body;
    if (!subjectId || !departmentId || !title)
      throw new Error("Malumot yetarli emas!");

    const theme = await Theme.create({ subjectId, departmentId, title });
    res.json({ message: "Malumot yaratildi!", theme });
  } catch (error) {
    res.json({ message: error.message });
  }
};

const deleteTheme = async (req, res) => {
  try {
    const { id } = req.params;
    await Theme.findByIdAndDelete(id);
    res.json({ message: "Malumot o'chirib yuborildi!" });
  } catch (error) {
    res.json({ message: error.message });
  }
};

const changeTheme = async (req, res) => {
  try {
    const { id } = req.params;
    const { subjectId, departmentId, title } = req.body;
    const theme = await Theme.findById(id);

    if (!theme) throw new Error("Malumot topilmadi!");

    if (subjectId) theme.subjectId = subjectId;
    if (departmentId) theme.departmentId = departmentId;
    if (title) theme.title = title;

    await theme.save();

    res.json({ message: "Malumot yangilandi!", theme });
  } catch (error) {
    res.json({ message: error.message });
  }
};

module.exports = {
  getThemes,
  createTheme,
  deleteTheme,
  changeTheme,
  getGroupThemes,
};
