const serverless = require('serverless-http');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const compression = require('compression');

// API  Routes
const routes = require('./routes/routes');
const config = require('./config');

const app = express();
app.use('*', cors());
app.use(compression());

// Make Mongoose promise global
mongoose.Promise = global.Promise;

// Connect to the database
let connectionString = config.databaseURL + ':' + config.databasePort + '/' + config.databaseCollection;
mongoose.connect(connectionString, {
  useMongoClient: true,
});

app.use(bodyParser.json());
routes(app);

app.use((err, req, res, next) => {
  res.status(422).send({ error: err.message });
});

// Configured for the serverless framework
//module.exports.handler = serverless(app);
module.exports = app;
