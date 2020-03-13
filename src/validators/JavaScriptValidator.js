const esLint = require('eslint');
const esLinter = new esLint.Linter();
const esLintConfig = require('../config/eslint.config');
const ValidationResult = require('../models/ValidationResult');

class JavaScriptValidator {
  extension = '.js';

  async run(code) {
    const errors = esLinter.verify(code, esLintConfig);
    return new ValidationResult(errors.length === 0, errors);
  }
}

module.exports = new JavaScriptValidator();