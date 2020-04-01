const express = require("express");
const { query } = require("express-validator");
const { validate } = require("./middleware");
const feedbackController = require("./controllers/feedback.controller");

const router = express.Router();

router.get("/feedback", validate([
  query("repo").isString().matches(".\\/."),
  query("branch").isString().optional()
]), feedbackController.getFeedback);

module.exports = router;
