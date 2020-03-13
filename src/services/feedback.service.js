const {readFile} = require('fs').promises;

const esLint = require('eslint');
const styleLint = require('stylelint');
const htmlHint = require('htmlhint');

const esLinter = new esLint.Linter();
const esLintConfig = require('../config/eslint.config');
const styleLintConfig = require('../config/stylelint.config');
const htmlHinter = new htmlHint.HTMLHint();
const htmlHinterConfig = null;

async function getFeedback(files) {
  return Promise.all(
    files.map(async file => {
      const buffer = await readFile(file.path);

      console.log(`Validating ${file.name}...`);

      const result = await validateCode(
        buffer.toString(),
        file.extension
      );

      console.log(`Validated  ${file.name}!`);

      return result;
    })
  );
}

async function validateCode(code, extension) {
  let result;

  // TODO: Setup generic Validator implementation using factory pattern
  switch (extension) {
    case '.js':
      result = esLinter.verify(code, esLintConfig);
      break;
    case '.css':
      result = (await styleLint.lint({code, config: styleLintConfig})).output;
      break;
    case '.html':
      result = htmlHinter.verify(code);
      break;
    default:
      console.warn('Unsupported extension detected');
  }

  return result;
}

module.exports = {getFeedback};
