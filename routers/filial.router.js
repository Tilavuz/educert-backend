const { getFilials, createFilial, changeFilial, removeFilial } = require('../controllers/filial.controller')
const { isAuth } = require('../middleware/auth.middleware')

const router = require('express').Router()


router.get('/filials', isAuth, getFilials)
router.post("/filials/add", isAuth, createFilial);
router.put("/filials/update/:id", isAuth, changeFilial);
router.delete("/filials/delete/:id", isAuth, removeFilial);


module.exports = router