const shell = require('shelljs-exec-proxy');
const express = require('express');
const router = require('./src/app.router');
require('dotenv').config();

const app = express();
const name = process.env.APP_NAME;
const port = process.env.APP_PORT;

if (!shell.which('git')) {
  throw new Error(`${name} requires Git to be installed.`);
}

app.use(router);

app.listen(port, () => {
  console.log(`${name} is listen on port ${port}`)
});

process.on('SIGINT', () => {
  shell.rm('-rf', './temp/*'); // cleanup temp folder
  shell.exit(); // graceful shutdown
  process.exit();
});
