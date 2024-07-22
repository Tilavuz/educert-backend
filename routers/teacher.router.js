const router = require('express').Router()
const { getTeachers, createTeacher, changeTeacher, removeTeacher, getTeachersOneFilial, getTeacher } = require('../controllers/teacher.controller');
const {isAuth} = require('../middleware/auth.middleware')
const upload = require('../middleware/upload.middleware')

router.get("/teachers", isAuth, getTeachers);
router.get("/teachers/:id", isAuth, getTeacher);
router.get("/teachers/filial/:id", isAuth, getTeachersOneFilial);
router.post("/teachers/add", isAuth, upload, createTeacher);
router.put("/teachers/update/:id", isAuth, upload, changeTeacher);
router.delete("/teachers/delete/:id", isAuth, removeTeacher);

module.exports = router