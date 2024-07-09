const { getAuth, login, register } = require('../controllers/auth.controller')
const { isAuth } = require('../middleware/auth.middleware')

const router = require('express').Router()

router.get('/auth', isAuth, getAuth)
router.post('/auth/login', login)
router.post("/auth/register", register);


module.exports = router