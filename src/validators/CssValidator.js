const Linter = require("stylelint");
const config = require("../config/stylelint.config");
const ValidationResult = require("../models/ValidationResult");
const ValidationError = require("../models/ValidationError");

class CssValidator {
  extensions = [".css", ".scss", ".less", ".sass"];

  async run(code) {
    const result = await Linter.lint({ code, config });
    const output = result.results[0].warnings; // get the first and only lint result
    const errors = output.map(e => new ValidationError(
      e.rule,
      e.severity,
      e.text,
      e.line,
      e.column
    ));

    return new ValidationResult(errors);
  }
}

module.exports = new CssValidator();
