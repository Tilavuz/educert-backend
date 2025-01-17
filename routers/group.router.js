const router = require('express').Router()
const { isAuth } = require('../middleware/auth.middleware')
const { getGroups, createGroup, changeGroup, removeGroup, getGroupsOneFilial, getGroupsOneTeacher } = require('../controllers/group.controller')

router.get('/groups', isAuth, getGroups)
router.get("/groups/filial/:id", isAuth, getGroupsOneFilial);
router.get("/groups/teacher/:id", isAuth, getGroupsOneTeacher);
router.post('/groups/add', isAuth, createGroup)
router.put('/groups/update/:id', isAuth, changeGroup)
router.delete('/groups/delete/:id', isAuth, removeGroup)

module.exports = router