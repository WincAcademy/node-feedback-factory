const htmlHint = require("htmlhint");
const htmlHinter = new htmlHint.HTMLHint();
const ValidationResult = require("../models/ValidationResult");
const ValidationError = require("../models/ValidationError");

class HtmlValidator {
  extension = ".html";

  async run(code) {
    // TODO: HtmlHinter is not living up to its expectations, replace with more powerful (CLI) alternative
    const result = htmlHinter.verify(code);
    const errors = result.map(e => new ValidationError(
      e.id,
      "warning",
      e.message,
      e.line,
      e.column
    ));

    return new ValidationResult(errors);
  }
}

module.exports = new HtmlValidator();
