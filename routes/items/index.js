const router = require("express").Router();
const item = require("../../controllers/items/items.controller");
const { upload } = require("../../middlewares/upload");
const authorization = require("../../utils/authorization");
const { verifyToken } = require("../../utils/verifyToken");

router.post("/", upload, item.createItem);
router.get("/", item.getAllItems);
router.get("/search/:key", item.searchValue);
router.delete("/:id", item.deleteItem);

module.exports = router;
