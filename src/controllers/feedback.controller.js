const fs = require('fs');
const shell = require('shelljs');
const {resolve, join} = require('path');
const fileService = require('../services/file.service');

const esLint = require('eslint');
const styleLint = require('stylelint');
const htmlHint = require('htmlhint');

const esLinter = new esLint.Linter();
const esLintConfig = require('../config/eslint.config');
const styleLintConfig = require('../config/stylelint.config');
const htmlHinter = new htmlHint.HTMLHint();
const htmlHinterConfig = null;

async function getFeedback(req, res) {
  const repositoryUrl = 'https://github.com/' + req.query.repo;

  const tempPath = resolve('./temp');
  const tempName = Date.now();
  const tempDir = join(tempPath, tempName.toString());

  // TODO: Cache cloned repo's to prevent cloning twice
  const tempCache = {};

  shell.exec(`git clone ${repositoryUrl} ${tempDir}`);

  fileService.getFiles(tempDir).then(files => {
    const promises = files.map(async file => {
      const code = fs.readFileSync(file.path).toString();
      let result;

      switch (file.extension) {
        case '.js':
          result = esLinter.verify(code, esLintConfig);
          break;
        case '.css':
          result = await styleLint.lint({code, config: styleLintConfig});
          break;
        case '.html':
          result = htmlHinter.verify(code);
          break;
        default:
          console.warn('Unsupported extension detected');
      }

      console.log(`Validation result for "${file.name}":`);
      return result;
    });

    return Promise.all(promises);
  }).then((messages) => {
    res.json({
      result: messages
    });
  }).catch((error) => {
    console.error('Error occured', error);
    res.status(400).json('Something went wrong');
  });
}

module.exports = { getFeedback };
