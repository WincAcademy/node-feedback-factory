class Feedback {
  /**
   * @param {File} file
   * @param {string} code
   * @param {ValidationResult} result
   */
  constructor(file, code, result) {
    this.file = {
      name: file.name,
      path: file.dir,
      extension: file.extension,
      content: code
    };
    this.result = result;
  }
}

module.exports = Feedback;
