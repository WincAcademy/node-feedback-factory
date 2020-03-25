const { resolve, join } = require("path");
const download = require("download");

const STORAGE_PATH = resolve("./temp");
const CACHE = {}; // lazy cache using a hashmap

const hasRepoCached = repo => CACHE.hasOwnProperty(repo);
const getFromCache = repo => CACHE[repo];
const cacheRepo = (path, repo) => (CACHE[repo] = { path, repo });

/**
 * Get the contents of the given repository.
 *
 * @param   {string} repo
 * @returns {Promise}
 */
async function getRepository(repo) {
  return hasRepoCached(repo)
    ? getFromCache(repo)
    : await downloadRepository(repo);
}

/**
 * Download the contents of the given repository.
 *
 * @param   {string} repo
 * @returns {Promise}
 */
async function downloadRepository(repo) {
  const [user, repoName] = repo.toLowerCase().split("/");
  const path = join(STORAGE_PATH, user, repoName);
  const zipUrl = `https://github.com/${repo}/archive/master.zip`;

  await download(zipUrl, path, { extract: true });

  cacheRepo(path, repo);

  return getFromCache(repo);
}

module.exports = { getRepository };
