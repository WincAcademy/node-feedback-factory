const { JavaScriptValidator, HtmlValidator, CssValidator } = require('../validators');
const { readFile } = require('fs').promises;
const Feedback = require('../models/Feedback');

const VALIDATORS = [
  JavaScriptValidator,
  HtmlValidator,
  CssValidator
];

/**
 * @returns {Promise<Feedback[]>}
 */
async function getFeedback(files) {
  return Promise.all(
    files.map(async file => {
      const buffer = await readFile(file.path);
      const result = await validateCode(
        buffer.toString(),
        file.extension
      );

      return new Feedback(file, result);
    })
  );
}

/**
 * @returns {Promise<ValidationResult>}
 */
async function validateCode(code, extension) {
  const validator = VALIDATORS.find(validator => validator.extension === extension);

  if (!validator) {
    throw new Error(`Unable to validate unsupported file extension "${extension}"`);
  }

  return await validator.run(code);
}

module.exports = { getFeedback };
