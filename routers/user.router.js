const router = require('express').Router()
const { isAuth } = require('../middleware/auth.middleware')
const { getUsers, createUser, changeUser, removeUser } = require('../controllers/user.controller')
const upload = require('../middleware/upload.middleware')

router.get("/users", isAuth, getUsers);
router.post("/users/add", isAuth, upload, createUser);
router.put("/users/update/:id", isAuth, upload, changeUser);
router.delete("/users/delete/:id", isAuth, removeUser);


module.exports = router