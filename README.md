# Feedback Factory

A lightweight Node.js implementation to validate code from public repositories.

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

## Modules

- Express
- Jest
- ShellJS
- ESLint
- HtmlHint
- StyleLint
