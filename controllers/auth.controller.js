const { generateToken } = require("../helper/generate-token");
const Auth = require("../models/auth.model");
const bcrypt = require("bcrypt");

const login = async (req, res) => {
  try {
    const { phone, password } = req.body;
    const auth = await Auth.findOne({ phone })
    
    if (!auth) throw new Error("Bunday admin mavjut emas!");

    const isMatch = await bcrypt.compare(password, auth.password);
    if (!isMatch) throw new Error("Parolda xatolik bor!");

    const token = generateToken({ _id: auth._id });
    res.json({ token, auth });
  } catch (error) {
    res.json({ message: error.message })
  }
};

const register = async (req, res) => {
  try {
    const { phone, password } = req.body;
    const auth = await Auth.findOne({ phone });

    if (auth) throw new Error("Telefon raqam noto'g'ri!");

    const newAuth = await Auth.create({ phone, password });

    res.json({ message: "Malumot yaratildi!", auth: newAuth });
  } catch (error) {
    res.json({ message: error.message });
  }
};

const getAuth = async (req, res) => {
  try {
    const { _id } = req.user;
    const auth = await Auth.findById(_id).select('-password')
    res.json(auth);
  } catch (error) {
    res.json({ message: error.message });
  }
};

module.exports = { login, register, getAuth };
