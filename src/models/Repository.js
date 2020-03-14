class Repository {
  /**
   * @param {string} id
   * @param {string} name
   * @param {string} url
   * @param {string} path
   * @param {object} provider
   */
  constructor(id, name, url, path, provider) {
    this.id = id;
    this.name = name;
    this.url = url;
    this.path = path;
    this.provider = provider;
  }
}

module.exports = Repository;
