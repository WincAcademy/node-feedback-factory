class Repository {

  constructor(id, name, url, path, provider) {
    this.id = id;
    this.name = name;
    this.url = url;
    this.path = path;
    this.provider = provider;
  }

}

module.exports = Repository;
