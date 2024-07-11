const {
  getRooms,
  createRoom,
  changeRoom,
  removeRoom,
  getFilialRooms,
} = require("../controllers/room.controller");
const { isAuth } = require("../middleware/auth.middleware");

const router = require("express").Router();

router.get("/rooms", isAuth, getRooms);
router.get("/rooms/filial/:id", isAuth, getFilialRooms);
router.post("/rooms/add", isAuth, createRoom);
router.put("/rooms/update/:id", isAuth, changeRoom);
router.delete("/rooms/delete/:id", isAuth, removeRoom);

module.exports = router;
