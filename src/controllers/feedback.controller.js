const { logger, capture } = require("../util");
const gitService = require("../services/git.service");
const fileService = require("../services/file.service");
const feedbackService = require("../services/feedback.service");

async function getFeedback(req, res) {
  const params = req.query;

  const [error, repo] = await capture(
    gitService.getRepository(params.user, params.repo, params.branch)
  );

  if (error) {
    return res.status(404).send({
      error: "Repository not found"
    });
  }

  try {
    const files = await fileService.getFiles(repo.path);
    const result = await feedbackService.getFeedback(files);
    const tree = await fileService.directoryTree(repo.path);
    const data = { repo, result, tree };
    logger.info("Feedback retrieved", repo);
    res.json({ data });
  } catch (err) {
    logger.error("Failed to retrieve feedback", repo);
    res.status(500).send({
      error: "Unable to retrieve feedback"
    });
  }
}

module.exports = { getFeedback };
