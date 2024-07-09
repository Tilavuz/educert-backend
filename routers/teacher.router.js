const router = require('express').Router()
const { getTeachers, createTeacher, changeTeacher, removeTeacher } = require('../controllers/teacher.controller');
const {isAuth} = require('../middleware/auth.middleware')
const teacherUploads = require('../middleware/teacher.upload.middleware')

router.get("/teachers", isAuth, getTeachers);
router.post("/teachers/add", isAuth, teacherUploads, createTeacher);
router.put("/teachers/update/:id", isAuth, teacherUploads, changeTeacher);
router.delete("/teachers/delete/:id", isAuth, removeTeacher);

module.exports = router