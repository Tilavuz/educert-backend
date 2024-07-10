const router = require('express').Router()
const { getStudents, createStudent, changeStudent, removeStudent } = require('../controllers/student.controller');
const { isAuth } = require('../middleware/auth.middleware')
const studentUpload = require('../middleware/student.upload.middleware')

router.get("/students", isAuth, getStudents);
router.post("/students/add", isAuth, studentUpload, createStudent);
router.put("/students/update/:id", isAuth, studentUpload, changeStudent);
router.delete("/students/delete/:id", isAuth, removeStudent);

module.exports = router