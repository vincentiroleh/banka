// Import dependencies
import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import routes from './routes/index';

// Initialized express
const app = express();

// Log requests to the console.
app.use(logger('dev'));

// Setup body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false,
}));

// Router
app.use(routes);

/**
 * @param  {string} route The index url
 * @param  {function}
 * @param  {string} success message
 */
app.get('/', (req, res) => {
  res.status(200).send({
    message: 'Welcome to Banka',
  });
});

export default app;
