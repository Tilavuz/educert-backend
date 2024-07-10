const { getTimes, createTime, changeTime, removeTime } = require('../controllers/time.controller');
const router = require('express').Router()
const { isAuth } = require('../middleware/auth.middleware')


router.get('/times', isAuth, getTimes)
router.post('/times/add', isAuth, createTime)
router.put('/times/update/:id', isAuth, changeTime)
router.delete("/times/delete/:id", isAuth, removeTime);


module.exports = router