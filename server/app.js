// Import dependencies
import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';

// Initialized express
const app = express();

// Log requests to the console.
app.use(logger('dev'));

// Setup body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true,
}));

// Setup a default catch-all route that sends back a welcome message in JSON format.
app.get('/', (req, res) => res.status(200).send('Welcome to banka'));

export default app;
