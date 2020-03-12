const { resolve, extname } = require('path');

class File {

  constructor(name, dir) {
    this.name = name;
    this.dir = dir;
    this.path = resolve(dir, name);
    this.extension = extname(name);
  }

}

module.exports = File;
