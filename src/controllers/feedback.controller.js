const gitService = require("../services/git.service");
const fileService = require("../services/file.service");
const feedbackService = require("../services/feedback.service");
const { validationResult } = require('express-validator');

async function getFeedback(req, res) {
  const params = { user, repo, branch } = req.query;

  try {
    const repo = await gitService.getRepository(params.user, params.repo, params.branch);
    const files = await fileService.getFiles(repo.path);
    const feedback = await feedbackService.getFeedback(files);
    console.log("Retrieved feedback for", repo);

    res.json({
      data: feedback
    });
  } catch (err) {
    console.error(err); // TODO: Implement Winston logging instead of writing to the console
    res.status(400).send({
      error: "Something went wrong"
    });
  }
}

module.exports = { getFeedback };
