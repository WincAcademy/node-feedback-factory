const { resolve, join } = require("path");
const download = require("download");

const STORAGE_PATH = resolve("./temp");
const CACHE = {}; // lazy cache using a hashmap

const repoIsCached = repo => CACHE.hasOwnProperty(repo);
const getFromCache = repo => CACHE[repo];
const cacheRepo = (path, repo) => (CACHE[repo] = { path, repo });

const getFromWeb = async repo => {
  if (!repo) throw "I need 'user/repo' as input, no input given";

  if (repo.split("/").length !== 2)
    throw `I need "user/repo" as input, I got: "${repo}"`;

  const [user, repo_name] = repo.toLowerCase().split("/");
  const path = join(STORAGE_PATH, user, repo_name);
  const url_to_zip = `https://github.com/${repo}/archive/master.zip`;

  await download(url_to_zip, path, { extract: true });
  cacheRepo(path, repo);
  return getFromCache(repo);
};

const getRepository = async repo =>
  repoIsCached(repo) ? getFromCache(repo) : await getFromWeb(repo);

module.exports = { getRepository };
