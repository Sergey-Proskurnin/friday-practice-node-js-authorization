const { Router } = require("express");
const { usersController } = require("../controllers");
const validateToken = require("../middleware/token.middleware");

const router = Router();

router.post("/register", usersController.register);
router.post("/login", usersController.login);

module.exports = router;
