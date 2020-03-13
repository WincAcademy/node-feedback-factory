# Feedback Factory

A lightweight Node.js implementation to validate code from public repositories.

## Features

- Exposes a simple REST API
- Fetches repository contents from different Git providers
- Simple in-memory cache to prevent cloning the same repo twice
- Class-based validation for any file extension
- Consistent code-style following best-practices
- Asynchronous to the bone

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

Call the `/feedback` endpoint with the query parameter "repo":

    localhost:3000/feedback?repo=WincAcademy/react-groceries-list
    
## Documentation

#### Adding a route

Add routes to the application router in `src/app.router.js`. Routes should have a dedicated controller in which the handler resides.

#### Creating a validator

Create and export a new class in `src/validators`. The validator should have at least;
- A property named `extension` which defines the supported extension (i.e. '.scss').
- A method named `run` which accepts a `code` parameter.

