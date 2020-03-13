const esLint = require('eslint');
const esLinter = new esLint.Linter();
const esLintConfig = require('../config/eslint.config');
const ValidationResult = require('../models/ValidationResult');

class JavaScriptValidator {
  extension = '.js';

  async run(code) {
    const result = esLinter.verify(code, esLintConfig);
    return new ValidationResult(false, result);
  }
}

module.exports = new JavaScriptValidator();