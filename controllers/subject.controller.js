const Subject = require("../models/subject.model");
const path = require("path");
const deletePhoto = require("../helper/delete-photo");

const getSubjects = async (req, res) => {
  try {
    const subjects = await Subject.find().populate("filial");
    res.json(subjects);
  } catch (error) {
    console.log(error);
  }
};

const createSubject = async (req, res) => {
  try {
    const { title, filial } = req.body;
    const subject = await Subject.findOne({ title, filial });

    if (subject) throw new Error("Bunday fan mavjut!");

    const photo = req.file ? req.file.filename : "default-image.png";

    let newSubject = await Subject.create({ title, filial, photo });
    newSubject = await Subject.findById(newSubject._id).populate("filial");
    res.json({ message: "Fan yaratildi!", subject: newSubject });
  } catch (error) {
    console.log(error);
  }
};

const removeSubject = async (req, res) => {
  try {
    const { id } = req.params;
    const subject = await Subject.findByIdAndDelete(id);

    if (!subject) {
      return res.status(404).json({ message: "Subject topilmadi!" });
    }

    if (subject.photo !== "default-image.png") {
      const photoPath = path.join(
        __dirname,
        "../uploads/subjects",
        subject.photo
      );
      deletePhoto(photoPath);
    }

    res.json({ message: "Subject va rasm o'chirildi!" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server xatosi!" });
  }
};

const changeSubject = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, filial } = req.body;
    let subject = await Subject.findById(id);

    if (!subject) {
      return res.status(404).json({ message: "Subject topilmadi!" });
    }

    if (title) subject.title = title;
    if (filial) subject.filial = filial;

    
    if (req.file) {
      if (subject.photo !== "default-image.png") {
        const oldPhotoPath = path.join(
          __dirname,
          "../uploads/subjects",
          subject.photo
        );
        deletePhoto(oldPhotoPath);
      }

      subject.photo = req.file.filename;
    }

    await subject.save();
    subject = await Subject.findById(subject._id).populate('filial')
    res.json({ message: "Subject yangilandi!", subject });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server xatosi!" });
  }
};

module.exports = { createSubject, getSubjects, removeSubject, changeSubject };
