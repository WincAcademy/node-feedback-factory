const shell = require("shelljs-exec-proxy");
const express = require("express");
const router = require("./app.router");
require("dotenv").config();

const app = express();
const name = process.env.NAME || "Feedback Factory";
const port = process.env.PORT;

if (!shell.which("git")) {
  throw new Error(`${name} requires Git to be installed.`);
}

app.use(router);

app.listen(port, () => {
  console.log(`${name} is listening on port ${port}`);
});

process.on("SIGINT", () => {
  shell.rm("-rf", "./temp/*"); // cleanup temp folder
  shell.exit(); // graceful shutdown
});
