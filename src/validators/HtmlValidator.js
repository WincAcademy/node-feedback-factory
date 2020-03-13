const htmlHint = require('htmlhint');
const htmlHinter = new htmlHint.HTMLHint();
const htmlHinterConfig = {};

class HtmlValidator {
  extension = '.css';

  async run(code) {
    return htmlHinter.verify(code);
  }
}

module.exports = new HtmlValidator();
