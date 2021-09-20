const { Router } = require("express");
const model = require("../models/products.model");
const { productsController } = require("../controllers");
const validateToken = require("../middleware/token.middleware");

const router = Router();

router.get("/health", (_req, res, _next) => {
  res.json({ massage: "OK" });
});

router.post("/products", validateToken, productsController.creatOne);
router.get("/products", validateToken, productsController.getAll);

module.exports = router;
