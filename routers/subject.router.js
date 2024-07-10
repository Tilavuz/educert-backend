const { createSubject, getSubjects, removeSubject, changeSubject, getSubjectsOneFilial } = require('../controllers/subject.controller')
const { isAuth } = require('../middleware/auth.middleware')
const subjectUploads = require('../middleware/subject.upload.middleware')

const router = require('express').Router()

router.get('/subjects', isAuth, getSubjects)
router.get("/subjects/filial/:id", isAuth, getSubjectsOneFilial);
router.post("/subjects/add", isAuth, subjectUploads, createSubject);
router.delete("/subjects/delete/:id", isAuth, removeSubject);
router.put("/subjects/update/:id", isAuth, subjectUploads, changeSubject);


module.exports = router