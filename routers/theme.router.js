const { getThemes, createTheme, deleteTheme, changeTheme } = require("../controllers/theme.controller");
const { isAuth } = require("../middleware/auth.middleware");
const router = require("express").Router();

router.get("/themes/:id", isAuth, getThemes);
router.post("/themes/add", isAuth, createTheme);
router.put("/themes/update/:id", isAuth, changeTheme);
router.delete("/themes/delete/:id", isAuth, deleteTheme);

module.exports = router;
