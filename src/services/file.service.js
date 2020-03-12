const { resolve } = require('path');
const { readdir } = require('fs').promises;
const File = require('../models/File');

const defaultCriteria = {
  excludedDirectories: ['node_modules'],
  allowedExtensions: ['.js', '.css', 'html']
};

/**
 * Recursively get all files (matching the given criteria) within the given directory.
 *
 * @param  {string} dir
 * @param  {object} criteria
 * @return {Promise<File[]>}
 */
async function getFiles(dir, criteria = defaultCriteria) {
  const dirents = await readdir(dir, { withFileTypes: true });
  const files = await Promise.all(dirents.map((dirent) => {
    const path = resolve(dir, dirent.name);

    if (dirent.isDirectory()) {
      const disallowed = criteria.excludedDirectories.includes(dirent.name);
      return disallowed ? null : getFiles(path);
    }

    const file = new File(dirent.name, dir);
    const allowed = criteria.allowedExtensions.includes(file.extension);
    return allowed ? file : null;
  }));

  return Array.prototype.concat(...files).filter(Boolean); // flatten array of arrays
}

module.exports = { getFiles };
