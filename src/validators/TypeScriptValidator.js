const Linter = require("eslint").Linter;
const parser = require("@typescript-eslint/parser");
const config = require("../config/tslint.config");
const ValidationResult = require("../models/ValidationResult");
const ValidationError = require("../models/ValidationError");

class TypeScriptValidator {
  extension = ".ts";
  severities = ["off", "warning", "error"];

  constructor() {
    this.linter = new Linter();
    this.linter.defineParser('typescript-parser', parser);
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

module.exports = new TypeScriptValidator();
