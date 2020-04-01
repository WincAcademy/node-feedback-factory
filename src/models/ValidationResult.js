class ValidationResult {
  /**
   * @param {ValidationError[]} errors
   */
  constructor(errors) {
    this.passed = errors.length === 0;
    this.errors = errors;
  }
}

module.exports = ValidationResult;
