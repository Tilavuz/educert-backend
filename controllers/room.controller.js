const Room = require("../models/room.model");

const getRooms = async (req, res) => {
  try {
    const rooms = await Room.find().populate("filial");
    res.json(rooms);
  } catch (error) {
    res.json({ message: error.message })
  }
};

const createRoom = async (req, res) => {
  try {
    const { filial, number } = req.body;

    const isHaveRoom = await Room.findOne({ number, filial });
    if (isHaveRoom) throw new Error("Bunday xona mavjut!");

    if (!filial || !number) throw new Error("Malumot yetarli emas!");

    let room = await Room.create({ filial, number });
    room = await Room.findById(room._id).populate('filial')

    res.json({ message: "Room yaratildi!", room });
  } catch (error) {
    res.json({ message: error.message })
  }
};

const changeRoom = async (req, res) => {
  try {
    const { id } = req.params;
    const { number, filial } = req.body;
    let room = await Room.findById(id);

    if(!room) throw new Error('Xona topilmadi!')

    if (number) room.number = number;
    if (filial) room.filial = filial;

    await room.save();
    room = await Room.findById(id).populate('filial')
    res.json({ message: "Xona yangilandi!", room });
  } catch (error) {
    res.json({ message: error.message })
  }
};

const removeRoom = async (req, res) => {
  try {
    const { id } = req.params;
    const room = await Room.findByIdAndDelete(id);
    res.json({ message: "Room o'chirib yuborildi!", room });
  } catch (error) {
    res.json({ message: error.message })
  }
};

module.exports = { getRooms, createRoom, changeRoom, removeRoom };
