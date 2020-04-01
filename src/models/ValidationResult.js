class ValidationResult {
  /**
   * @param {array} errors
   */
  constructor(errors) {
    this.passed = errors.length === 0;
    this.errors = errors;
  }
}

module.exports = ValidationResult;
