const router = require("express").Router();
const feedback = require("../../controllers/feedbacks/feedbacks.controller");
const { upload } = require("../../middlewares/upload");
const authorization = require("../../utils/authorization");
const { verifyToken } = require("../../utils/verifyToken");

router.post("/", feedback.createFeedback);
router.get("/", feedback.getAllFeedback);

module.exports = router;
