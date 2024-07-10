const router = require('express').Router()
const { isAuth } = require('../middleware/auth.middleware')
const { getUsers, createUser, changeUser, removeUser } = require('../controllers/user.controller')
const userUpload = require('../middleware/user.upload.middleware')

router.get("/users", isAuth, getUsers);
router.post("/users/add", isAuth, userUpload, createUser);
router.put("/users/update/:id", isAuth, userUpload, changeUser);
router.delete("/users/delete/:id", isAuth, removeUser);


module.exports = router