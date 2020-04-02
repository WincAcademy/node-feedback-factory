/**
 * Slugify the given string.
 *
 * @param {string} str
 * @param {string} separator
 * @returns {string}
 */
function slugify(str, separator = ".") {
  return str
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, separator) // Replace spaces with separator
    .replace(/[^\w\-]+/g, ""); // Remove all non-word chars
}

/**
 * Promise wrapper to capture the result into a fixed array (aka "tuple").
 *
 * @param promise
 * @returns {promise<array>}
 */
function capture(promise) {
  return promise
    .then(result => [undefined, result])
    .catch(error => [error, undefined]);
}

module.exports = { slugify, capture };
