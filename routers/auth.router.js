const { getAuth, login, register, loginTeacher, getUser } = require('../controllers/auth.controller')
const { isAuth } = require('../middleware/auth.middleware')

const router = require('express').Router()

router.get('/auth', isAuth, getAuth)
router.get("/auth/user", isAuth, getUser);
router.post('/auth/login', login)
router.post("/auth/login/teacher", loginTeacher);
router.post("/auth/register", register);


module.exports = router