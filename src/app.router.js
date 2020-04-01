const express = require("express");
const { query } = require("express-validator");
const { validate } = require("./middleware");
const feedbackController = require("./controllers/feedback.controller");

const router = express.Router();

router.get("/feedback", validate([
  query("user").matches(/^[a-z\d](?:[a-z\d]|-(?=[a-z\d])){0,38}$/i),
  query("repo").isString(),
  query("branch").isString().optional()
]), feedbackController.getFeedback);

module.exports = router;
