const Department = require("../models/department.model");
const Theme = require("../models/theme.model");

const getSubjectDepartments = async (req, res) => {
  try {
    const { id } = req.params;
    const departments = await Department.find({ subjectId: id });
    res.json(departments);
  } catch (error) {
    res.json({ message: error.message });
  }
};

const createDepartment = async (req, res) => {
  try {
    const { id } = req.params;
    const { title } = req.body;

    if (!title) throw new Error("Malumot yetarli emas!");

    const department = await Department.create({ subjectId: id, title });
    res.json({ message: "Malumot yaratildi!", department });
  } catch (error) {
    res.json({ message: error.message });
  }
};

const deleteDepartment = async (req, res) => {
  try {
    const { id } = req.params;
    await Department.findByIdAndDelete(id);
    await Theme.deleteMany({ departmentId: id })
    res.json({ message: "Malumot o'chirib yuborildi!" });
  } catch (error) {
    res.json({ message: error.message });
  }
};

const changeDepartment = async (req, res) => {
  try {
    const { id } = req.params;
    const { subjectId, title } = req.body;
    const department = await Department.findById(id);

    if (!department) throw new Error("Malumot topilmadi!");

    if (subjectId) department.subjectId = subjectId;
    if (title) department.title = title;

    await department.save();

    res.json({ message: "Malumot yangilandi!", department });
  } catch (error) {
    res.json({ message: error.message });
  }
};

module.exports = {
  getSubjectDepartments,
  createDepartment,
  deleteDepartment,
  changeDepartment,
};
