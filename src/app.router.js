const express = require("express");
const feedbackController = require("./controllers/feedback.controller");

const router = express.Router();

router.get("/feedback", feedbackController.getFeedback);

module.exports = router;
