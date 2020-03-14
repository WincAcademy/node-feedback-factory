const gitService = require("../services/git.service");
const fileService = require("../services/file.service");
const feedbackService = require("../services/feedback.service");

async function getFeedback(req, res) {
  try {
    const repo = await gitService.getRepository(req.query.repo);
  } catch (err) {
    const proper_url =
      "http://localhost:3000/feedback?repo=WincAcademy/react-groceries-list";
    const message = `Could not find or clone repository.<br/>
    Please use a URL like <a href="${proper_url}">${proper_url}</a>
    `;
    res.status(400).send(message);
  }
  try {
    const files = await fileService.getFiles(repo.path);
    const feedback = await feedbackService.getFeedback(files);
    console.log("Retrieved feedback for", repo);

    res.json({
      repo,
      feedback
    });
  } catch (err) {
    console.error(err);
    res.status(400).send("Something went wrong.");
  }
}

module.exports = { getFeedback };
