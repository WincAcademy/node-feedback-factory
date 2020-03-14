const styleLint = require("stylelint");
const styleLintConfig = require("../config/stylelint.config");
const ValidationResult = require("../models/ValidationResult");

class CssValidator {
  extension = ".css";

  async run(code) {
    const result = await styleLint.lint({ code, config: styleLintConfig });
    const errors = result.results[0].warnings; // get the first and only lint result
    return new ValidationResult(errors.length === 0, errors);
  }
}

module.exports = new CssValidator();
