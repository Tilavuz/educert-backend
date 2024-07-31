const {
  getSubjectDepartments,
  createDepartment,
  deleteDepartment,
  changeDepartment,
} = require("../controllers/department.controller");
const { isAuth } = require("../middleware/auth.middleware");
const router = require("express").Router();

router.get("/departments/:id", isAuth, getSubjectDepartments); //subject id
router.post("/departments/add/:id", isAuth, createDepartment);
router.put("/departments/update/:id", isAuth, changeDepartment);
router.delete("/departments/delete/:id", isAuth, deleteDepartment);

module.exports = router;
