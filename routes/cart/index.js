const router = require("express").Router();
const cart = require("../../controllers/cart/cart.controller");
const { upload } = require("../../middlewares/upload");
const authorization = require("../../utils/authorization");
const { verifyToken } = require("../../utils/verifyToken");

router.post("/", cart.createCart);
router.get("/", cart.getAllCarts);
router.delete("/:id", cart.deleteCart);

module.exports = router;
