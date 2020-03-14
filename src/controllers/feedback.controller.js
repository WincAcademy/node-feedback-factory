const gitService = require("../services/git.service");
const fileService = require("../services/file.service");
const feedbackService = require("../services/feedback.service");

const getFeedback = async (req, res) => {
  try {
    const repo = await gitService.getRepository(req.query.repo);
    const files = await fileService.getFiles(repo.path);
    const feedback = await feedbackService.getFeedback(files);
    console.log("Retrieved feedback for", repo);

    res.json({
      repo,
      feedback
    });
  } catch (err) {
    console.error(err);
    res.status(400).send(`Something went wrong: ${err}`);
  }
};

module.exports = { getFeedback };
