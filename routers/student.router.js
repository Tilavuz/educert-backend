const router = require('express').Router()
const { getStudents, createStudent, changeStudent, removeStudent, getStudentsGroup, getStudent } = require('../controllers/student.controller');
const { isAuth } = require('../middleware/auth.middleware')
const upload = require('../middleware/upload.middleware')

router.get("/students", isAuth, getStudents);
router.get("/students/:id", isAuth, getStudent);
router.get("/students/group/:id", isAuth, getStudentsGroup);
router.post("/students/add", isAuth, upload, createStudent);
router.put("/students/update/:id", isAuth, upload, changeStudent);
router.delete("/students/delete/:id", isAuth, removeStudent);

module.exports = router