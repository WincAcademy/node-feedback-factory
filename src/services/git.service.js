const { resolve, join } = require("path");
const shell = require("shelljs-exec-proxy");
const Repository = require("../models/Repository");

const STORAGE_PATH = resolve("./temp");
const REPOSITORIES = {}; // lazy cache using a hashmap
const PROVIDERS = {
  GitHub: {
    name: "GitHub",
    url: "http://www.github.com"
  }
};

/**
 * Retrieve a repository from the given url.
 *
 * @param  {string} name
 * @param  {object} provider
 */
async function getRepository(name, provider = PROVIDERS.GitHub) {
  const id = `${name.replace("/", ".")}.${provider.name}`.toLowerCase();

  if (REPOSITORIES[id]) {
    return REPOSITORIES[id]; // return from cache
  }

  const url = `${provider.url}/${name}`;
  const path = join(STORAGE_PATH, id);

  await cloneRepository(url, path);

  const repo = new Repository(id, name, url, path, provider);

  REPOSITORIES[id] = repo; // add to cache

  return repo;
}

/**
 * Clone a Git repository using the shell.
 *
 * @param  {string} url
 * @param  {string} dir
 */
async function cloneRepository(url, dir) {
  // (1) clone the git repo with the least amount of history possible
  // and (2) remove the .git folder in its entirety
  shell.git.clone("--depth=1", url, dir);
  shell.rm("-rf", `${dir}/.git`);
}

module.exports = { getRepository, cloneRepository };
