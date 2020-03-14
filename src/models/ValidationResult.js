class ValidationResult {
  /**
   * @param {boolean} passed
   * @param {object} output
   */
  constructor(passed, output) {
    this.passed = passed;
    this.output = output;
  }
}

module.exports = ValidationResult;
