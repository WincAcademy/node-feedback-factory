const styleLint = require('stylelint');
const styleLintConfig = require('../config/stylelint.config');

class CssValidator {
  extension = '.css';

  async run(code) {
    return await styleLint.lint({code, config: styleLintConfig}).output;
  }
}

module.exports = new CssValidator();
