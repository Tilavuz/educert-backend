const router = require("express").Router();
const { getTasks, createTask, deleteTask, getTeacherGroup } = require("../controllers/teacher-task.controller");
const { isAuth } = require("../middleware/auth.middleware");
const uploadFile = require("../middleware/upload-file.middleware");

router.get("/teacher-tasks", isAuth, getTasks);
router.get("/teacher-group", isAuth, getTeacherGroup);
router.get("/teacher-tasks/create", isAuth, uploadFile, createTask);
router.get("/teacher-tasks/delete/:id", isAuth, deleteTask);

module.exports = router;
