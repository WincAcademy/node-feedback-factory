const gitService = require("../services/git.service");
const fileService = require("../services/file.service");
const feedbackService = require("../services/feedback.service");

async function getFeedback(req, res) {
  const params = { user, repo, branch } = req.query;

  try {
    const repo = await gitService.getRepository(params.user, params.repo, params.branch);
    const tree = await fileService.directoryTree(repo.path);
    const files = await fileService.getFiles(repo.path);
    const result = await feedbackService.getFeedback(files);
    console.log("Retrieved feedback for", repo);

    res.json({
      data: {
        tree,
        result
      }
    });
  } catch (err) {
    console.error(err); // TODO: Implement Winston logging instead of writing to the console
    res.status(400).send({
      error: "Something went wrong"
    });
  }
}

module.exports = { getFeedback };
