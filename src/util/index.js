/**
 * Slugify the given string.
 *
 * @param {string} str
 * @param {string} separator
 * @returns {string}
 */
function slugify(str, separator = '.') {
  return str.toString().toLowerCase().trim()
      .replace(/\s+/g, separator)   // Replace spaces with separator
      .replace(/[^\w\-]+/g, '')     // Remove all non-word chars
}

module.exports = { slugify };
