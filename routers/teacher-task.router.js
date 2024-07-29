const router = require("express").Router();
const { getTasks, createTask, deleteTask, getTeacherGroup, getTasksGroup } = require("../controllers/teacher-task.controller");
const { isAuth } = require("../middleware/auth.middleware");
const uploadFile = require("../middleware/upload-file.middleware");

router.get("/teacher-tasks", isAuth, getTasks);
router.get("/teacher-group", isAuth, getTeacherGroup);
router.get("/group/tasks/:id", isAuth, getTasksGroup);
router.post("/teacher-tasks/create/:id", isAuth, uploadFile, createTask);
router.delete("/teacher-tasks/delete/:id", isAuth, deleteTask);

module.exports = router;
