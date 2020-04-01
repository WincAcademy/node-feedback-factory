const gitService = require("../services/git.service");
const fileService = require("../services/file.service");
const feedbackService = require("../services/feedback.service");

async function getFeedback(req, res) {
  const repoUrl = req.query.repo;

  try {
    const repo = await gitService.getRepository(repoUrl);
    const files = await fileService.getFiles(repo.path);
    const feedback = await feedbackService.getFeedback(files);
    console.log("Retrieved feedback for", repo);

    res.json(feedback);
  } catch (err) {
    console.error(err); // TODO: Gracefully handle logs (using Winston) instead of writing to the console
    res.status(400).send("Something went wrong");
  }
}

module.exports = { getFeedback };
