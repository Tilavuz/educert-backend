const deletePhoto = require("../helper/delete-photo");
const User = require("../models/user.model");
const Auth = require("../models/auth.model");
const path = require("path");

const getUsers = async (req, res) => {
  try {
    const users = await User.find().populate("filial").populate({
      path: "auth",
      select: "-password",
    });
    res.json(users);
  } catch (error) {
    res.json({ message: error.message });
  }
};

const createUser = async (req, res) => {
  try {
    const { name, lastname, filial, phone, password } = req.body;
    const photo = req.file ? req.file.filename : "user-default-image.jpg";
    if (!name || !lastname || !filial || !phone || !password)
      throw new Error("Malumot yetarli emas!");

    const createAuth = await Auth.create({ phone, password, role: "user" });

    let user = await User.create({
      auth: createAuth._id,
      name,
      lastname,
      photo,
      filial,
    });

    user = await User.findById(user._id).populate("filial").populate({
      path: "auth",
      select: "-password",
    });
    res.json({ message: "User yaratildi", user });
  } catch (error) {
    res.json({ message: error.message });
  }
};

const changeUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, lastname, filial, phone, password } = req.body;
    let user = await User.findById(id);

    if (!user) throw new Error("Malumot topilmadi!");

    if (name) user.name = name;
    if (lastname) user.lastname = lastname;
    if (filial) user.filial = filial;

    if (password || phone) {
      let auth = await Auth.findById(user.auth);
      if (password) auth.password = password;
      if (phone) auth.phone = phone;
      await auth.save();
    }

    if (req.file) {
      if (user.photo !== "user-default-image.jpg") {
        const oldPhotoPath = path.join(
          __dirname,
          "../uploads",
          user.photo
        );
        deletePhoto(oldPhotoPath);
      }
      user.photo = req.file.filename;
    }

    await user.save();
    user = await User.findById(id).populate("filial").populate({
      path: "auth",
      select: "-password",
    });
    res.json({ message: "User yangilandi!", user });
  } catch (error) {
    res.json({ message: error.message });
  }
};

const removeUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndDelete(id);

    if (!user) throw new Error("User topilmadi!");

    await Auth.findByIdAndDelete(user.auth)

    if (user.photo !== "user-default-image.jpg") {
      const oldImagePath = path.join(__dirname, "../uploads", user.photo);
      deletePhoto(oldImagePath);
    }
    res.json({ message: "User o'chirib yuborildi!" });
  } catch (error) {
    res.json({ message: error.message });
  }
};

module.exports = { getUsers, createUser, changeUser, removeUser };
