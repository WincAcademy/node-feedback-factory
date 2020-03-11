const fs = require('fs');
const { resolve, join } = require('path');
const shell = require('shelljs');
const esLint = require('eslint');
const cssLint = require('csslint');
const htmlHint = require('htmlhint');
const FileReader = require('./src/utils/FileReader');

const esLinter = new esLint.Linter();
const esLintConfig = require('./src/config/eslint.config');
const cssLinter = cssLint.CSSLint;
const cssLinterConfig = null;
const htmlHinter = new htmlHint.HTMLHint();
const htmlHinterConfig = null;

// TODO: Create endpoint handler to pass in any cloneable repo
const repositoryUrl = 'https://github.com/WincAcademy/React-Lil-playlist';

// TODO: Move all this application logic away from main.js
const tempPath = resolve('./temp');
const tempName = Date.now();
const tempDir = join(tempPath, tempName.toString());

// TODO: Cache cloned repo's to prevent cloning twice
const tempCache = {};

shell.cd(tempPath);
shell.exec(`git clone ${repositoryUrl} ${tempName}`);

FileReader.getFiles(tempDir).then(files => {
  files.forEach(file => {
    const content = fs.readFileSync(file.path).toString();
    let messages = [];

    switch (file.extension) {
      case '.js':
        messages = esLinter.verify(content, esLintConfig);
        break;
      case '.css':
        messages = cssLinter.verify(content);
        break;
      case '.html':
        messages = htmlHinter.verify(content);
        break;
      default:
        console.warn('Unsupported extension detected');
    }

    console.log(`Validation result for: "${file.name}":`);
    console.log(messages);
  });
});
