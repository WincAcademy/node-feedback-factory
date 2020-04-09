const Linter = require("eslint").Linter;
const config = require("../config/eslint.config");
const ValidationResult = require("../models/ValidationResult");
const ValidationError = require("../models/ValidationError");

class JavaScriptValidator {
  extensions = [".js", ".jsx"];
  severities = ["off", "warning", "error"];

  constructor() {
    this.linter = new Linter();
  }

  async run(code) {
    const result = this.linter.verify(code, config);
    const errors = result.map(e => new ValidationError(
      e.ruleId,
      this.severities[e.severity],
      e.message,
      e.line,
      e.column
    ));

    return new ValidationResult(errors);
  }
}

module.exports = new JavaScriptValidator();
