class ValidationError {
  /**
   * @param {string} rule
   * @param {string} severity
   * @param {string} message
   * @param {number} line
   * @param {number} column
   * @param {string|null} nodeType
   */
  constructor(rule, severity, message, line, column, nodeType = null) {
    this.rule = rule;
    this.severity = severity;
    this.message = message;
    this.line = line;
    this.column = column;
    this.nodeType = nodeType;
  }
}

module.exports = ValidationError;
