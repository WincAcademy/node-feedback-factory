require('dotenv').config();

const express = require('express');
const feedbackController = require('./src/controllers/feedback.controller');

const app = express();
const port = process.env.APP_PORT;

app.get('/feedback', feedbackController.getFeedback);

app.listen(port, () => {
  console.log(`Feedback Factory is listen on port ${port}`)
});

process.on('SIGINT', () => {
  // TODO: Cleanup "temp" folder
  process.exit(); // graceful shutdown
});

