const { extname } = require("path");

class File {
  /**
   * @param {string} name
   * @param {string} dir
   * @param {string} path
   */
  constructor(name, dir, path) {
    this.name = name;
    this.dir = dir;
    this.path = path;
    this.extension = extname(name);
  }
}

module.exports = File;
