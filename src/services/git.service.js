const { resolve, join } = require("path");
const download = require("download");

const STORAGE_PATH = resolve("./temp");
const CACHE = {}; // lazy cache using a hashmap

const hasRepoCached = repo => CACHE.hasOwnProperty(repo);
const getFromCache = repo => CACHE[repo];
const cacheRepo = (slug, path, repo) => (CACHE[slug] = { slug, path, repo });
const getRepoSlug = (user, repo, branch) => `${user}/${repo}@${branch}`;

/**
 * Get the contents of the given repository.
 *
 * @param   {string} user
 * @param   {string} repo
 * @param   {string} branch
 * @returns {Promise}
 */
async function getRepository(user, repo, branch = 'master') {
  const slug = getRepoSlug(user, repo, branch);
  return hasRepoCached(slug)
    ? getFromCache(slug)
    : await downloadRepository(user, repo, branch);
}

/**
 * Download the contents of the given repository.
 *
 * @param   {string} user
 * @param   {string} repo
 * @param   {string} branch
 * @returns {Promise}
 */
async function downloadRepository(user, repo, branch = 'master') {
  const path = join(STORAGE_PATH, user, repo);
  const slug = getRepoSlug(user, repo, branch);
  const zipUrl = `https://github.com/${user}/${repo}/archive/${branch}.zip`;

  await download(zipUrl, path, { extract: true });

  const targetPath = join(path, `${repo}-${branch}`);

  cacheRepo(slug, targetPath, repo);

  return getFromCache(slug);
}

module.exports = { getRepository };
