const router = require('express').Router()
const { isAuth } = require('../middleware/auth.middleware')
const { getGroups, createGroup, changeGroup, removeGroup } = require('../controllers/group.controller')

router.get('/groups', isAuth, getGroups)
router.post('/groups/add', isAuth, createGroup)
router.put('/groups/update/:id', isAuth, changeGroup)
router.delete('/groups/delete/:id', isAuth, removeGroup)



module.exports = router