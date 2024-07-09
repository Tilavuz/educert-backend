const { generateToken } = require("../helper/generate-token");
const Auth = require("../models/auth.model");
const bcrypt = require("bcrypt");

const login = async (req, res) => {
  try {
    const { phone, password } = req.body;
    const auth = await Auth.findOne({ phone });
    
    if (!auth) res.json("Bunday admin mavjut emas!");

    const isMatch = bcrypt.compare(password, auth.password);
    if (!isMatch) res.json("Parol noto'g'ri");

    const token = generateToken({ _id: auth._id });
    res.json({ token });
  } catch (err) {
    console.log(err);
    res.json({ message: "Server error!" });
  }
};

const register = async (req, res) => {
  try {
    const { phone, password } = req.body;
    const auth = await Auth.findOne({ phone });

    if (auth) res.json({ message: "Telefon raqam noto'g'ri!" });

    const newAuth = await Auth.create({ phone, password });

    res.json({ message: "Malumot yaratildi!", auth: newAuth });
  } catch (err) {
    console.log(err);
    res.json({ message: "Server error!" });
  }
};

const getAuth = async (req, res) => {
  try {
    const { _id } = req.user;
    const auth = await Auth.findById(_id);
    res.json(auth);
  } catch (err) {
    console.log(err);
    res.json({ message: "Server error!" });
  }
};

module.exports = { login, register, getAuth };
