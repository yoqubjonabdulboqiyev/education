const { create, update, remove, getById, login, getAll } = require("../controller/admin");
const isAdmin = require("../middleware/is-admin.middleware");
const auth = require("../middleware/is-auth.middleware");
const uploads = require("../middleware/uploads-middleware");

const router = require("express").Router();

router.post("/admin", uploads, create);
router.put("/admin/:id", auth, isAdmin, uploads, update);
router.delete("/admin/:id", auth, isAdmin, remove);
router.get("/admin/:id", auth, isAdmin, getById);
router.get("/admin", auth, isAdmin, getAll);
router.post("/admin/login", login);


module.exports = router;