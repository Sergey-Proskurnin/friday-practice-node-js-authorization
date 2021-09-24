const { Router } = require("express");
const { usersController } = require("../controllers");

const router = Router();

router.post("/register", usersController.register);
router.post("/login", usersController.login);
router.get("/refresh", usersController.refresh);

module.exports = router;
