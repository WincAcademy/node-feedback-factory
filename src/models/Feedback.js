class Feedback {

  /**
   * @param {File} file
   * @param {ValidationResult} result
   */
  constructor(file, result) {
    this.file = file;
    this.result = result;
  }

}

module.exports = Feedback;
