const router = require("express").Router();
const user = require("./users");
const item = require("./items");
const cart = require("./cart");
const feedback = require("./feedbacks");

router.use("/user", user);
router.use("/item", item);
router.use("/cart", cart);
router.use("/feedback", feedback);

module.exports = router;
