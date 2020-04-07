# Feedback Factory

A lightweight Node.js implementation to validate code from public repositories.

## Features

- :zap: Exposes a REST API
- :zap: Fetches repository contents from different Git providers
- :zap: Simple in-memory cache to prevent cloning the same repo twice
- :zap: Class-based validation for any file extension
- :zap: Consistent code-style following best-practices
- :zap: Asynchronous to the bone

Made with :heart: by your Winc teachers.

## Getting started

1. Clone the repository: `git clone https://github.com/WincAcademy/node-feedback-factory.git`
2. Install dependencies: `npm install`
3. Set environment variables: `mv .env.example .env`
4. Serve the application: `npm start`

## Development

- Run `npm start` to serve the application.
- Run `npm run watch` to start the watcher. Changes trigger the application to re-compile and restart the server.

All available NPM tasks:

```bash
$ "start": "node ./app.js",
$ "watch": "nodemon ./app.js",
$ "test": "jest"
$ "cleanup": "rm -rf ./temp/*"
```

## Usage

Call the `/feedback` endpoint with the query parameters "user" and "repo":

    localhost:3000/feedback?user=WincAcademy&repo=react-groceries-list
    
The endpoint also supports different branches using the "branch" parameter. The default is set to "master".

## Documentation

#### Adding a route

Add routes to the application router in `src/app.router.js`. Routes should have a dedicated controller in which the handler resides.

#### Creating a validator

Create and export a new class in `src/validators`. The validator should at least;

- Have a property named `extension` which defines the supported extension (i.e. '.scss').
- Have a method named `run` which accepts a `code` parameter.
- Return an instance of `ValidationResult`

## Deployment

Deployed to Heroku: https://winc-feedback-factory.herokuapp.com/feedback
