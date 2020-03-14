const htmlHint = require("htmlhint");
const htmlHinter = new htmlHint.HTMLHint();
const htmlHinterConfig = {};
const ValidationResult = require("../models/ValidationResult");

class HtmlValidator {
  extension = ".html";

  async run(code) {
    const errors = htmlHinter.verify(code);
    return new ValidationResult(errors.length === 0, errors);
  }
}

module.exports = new HtmlValidator();
