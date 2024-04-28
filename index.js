// Importing necessary modules
const express = require('express');
const db = require('./config/connection');
const routes = require('./routes')

// Creating an instance of the express application 
const app = express();
const PORT = 3001;

// Middleware Setup
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

// Database Connection and Server Start
db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
  });
});