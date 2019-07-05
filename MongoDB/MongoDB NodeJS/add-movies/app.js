

import express from 'express';
import engines from 'consolidate';
import bodyParser from 'body-parser';
import mongodb from 'mongodb';
import assert from 'assert';
import route from './routes/index';

const app = express();
const MongoClient = mongodb.MongoClient;


// set the view engines
app.engine('html', engines.nunjucks);
app.set('view engine', 'html');
app.set('views', `${__dirname}/views`);
app.use(bodyParser.urlencoded({ extended: true }));

// Handler for internal server errors
const errorHandler = (err, req, res) => {
  res.status(500).render('error_template', { error: err });
};

// Connect the server to the database
MongoClient.connect('mongodb://localhost:27017/video', (err, db) => {
  assert.equal(null, err);
  console.log('Successfuly connected to MongoDB');

  // connect to the route
  route(app, db);

  app.use(errorHandler);
});

export default app;

