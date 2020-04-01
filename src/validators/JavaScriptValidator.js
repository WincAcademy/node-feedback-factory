const esLint = require("eslint");
const esLinter = new esLint.Linter();
const esLintConfig = require("../config/eslint.config");
const ValidationResult = require("../models/ValidationResult");
const ValidationError = require("../models/ValidationError");

const SEVERITIES = ['off', 'warning', 'error'];

class JavaScriptValidator {
  extension = ".js";

  async run(code) {
    const result = esLinter.verify(code, esLintConfig);
    const errors = result.map(e => new ValidationError(
      e.ruleId,
      SEVERITIES[e.severity],
      e.message,
      e.line,
      e.column
    ));

    return new ValidationResult(errors);
  }
}

module.exports = new JavaScriptValidator();
