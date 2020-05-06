const shell = require("shelljs-exec-proxy");
const express = require("express");
const helmet = require("helmet");
const router = require("./app.router");
const { cors, rateLimiter } = require("./middleware");
const { logger } = require("./util");
require("dotenv").config();

const app = express();
const name = process.env.NAME || "Feedback Factory";
const port = process.env.PORT;

if (!shell.which("git")) {
  throw new Error(`${name} requires Git to be installed.`);
}

app.use(cors);
app.use(helmet());
app.use(rateLimiter);
app.use(router);

app.listen(port, () => {
  logger.info(`${name} is listening on port ${port}`);
});

process.on("SIGINT", () => {
  shell.rm("-rf", "./temp/storage/*"); // cleanup storage folder
  shell.exit(); // graceful shutdown
});
