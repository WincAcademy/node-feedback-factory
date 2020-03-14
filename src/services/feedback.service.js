const { readFile } = require("fs").promises;
const Validators = require("../validators");
const Feedback = require("../models/Feedback");

/**
 * @returns {Promise<Feedback[]>}
 */
async function getFeedback(files) {
  return Promise.all(
    files.map(async file => {
      const buffer = await readFile(file.path);
      const code = buffer.toString();
      const result = await validateCode(code, file.extension);
      return new Feedback(file, code, result);
    })
  );
}

/**
 * @returns {Promise<ValidationResult>}
 */
async function validateCode(code, extension) {
  const validator = Validators.find(
    validator => validator.extension === extension
  );

  if (!validator) {
    throw new Error(
      `Unable to validate unsupported file extension "${extension}"`
    );
  }

  return await validator.run(code);
}

module.exports = { getFeedback };
