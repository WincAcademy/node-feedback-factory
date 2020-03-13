const gitService = require('../services/git.service');
const fileService = require('../services/file.service');
const feedbackService = require('../services/feedback.service');

async function getFeedback(req, res) {
  try {
    const repo = await gitService.getRepository(req.query.repo);
    const files = await fileService.getFiles(repo.path);
    console.log('Retrieved repository contents!');
    const feedback = await feedbackService.getFeedback(files);
    console.log('Received feedback!');

    res.json({
      repo,
      files,
      feedback
    });
  } catch (e) {
    res.status(400, 'Something went wrong.');
  }
}

module.exports = { getFeedback };
