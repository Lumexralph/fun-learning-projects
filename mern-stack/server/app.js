import  express from 'express';
import  bodyParser from 'body-parser';
import  { MongoClient } from 'mongodb';
import 'babel-polyfill';
import SourceMapSupport from 'source-map-support';
SourceMapSupport.install();

import  Issue from './issue';

const app = express();
// introduce middleware
app.use(express.static('static'));
// app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

// // webpack middleware
// if (process.env.NODE_ENV !== 'production') {
//   const webpack = require('webpack');
//   const webpackDevMiddleware = require('webpack-dev-middleware');
//   const webpackHotMiddleware = require('webpack-hot-middleware');

//   const config = require('../webpack.config');

//   const bundler = webpack(config);
//   app.use(webpackDevMiddleware(bundler, { noInfo: true, publicPath: config.output.publicPath }));

//   app.use(webpackHotMiddleware(bundler, { log: console.log}));
//  }

app.get('/api/issues', (req, res) => {
  db.collection('issues').find({}).toArray()
    .then(issues => {
      const metadata = {
        total_count: issues.length
      };
      res.json({
        _metadata: metadata,
        records: issues
      });
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ message: `Internal Server Error: ${error}` });
    });
});

app.post('/api/issues', (req, res) => {
  const newIssue = req.body;
  newIssue.created = new Date();
  if(!newIssue.status) {
    newIssue.status = 'New';
  }
  // validate
  const err = issue.validateIssue(newIssue);
  if (err) {
    res.status(422).json({ message: `Invalid request: ${err}` });
    return;
  }
  db.collection('issues').insertOne(Issue.cleanupIssue(newIssue))
     .then(result => db.collection('issues').find({ _id: result.insertedId }).limit(1).next()
   )
   .then(newIssue => {
     res.json(newIssue);
   })
   .catch(error => {
     console.log(error);
     res.status(500).json({ message: `Internal Server Error: ${error}` });
   })
});

let db;
MongoClient.connect('mongodb://localhost/issuetracker')
                   .then(connection => {
                     db = connection;
                     app.listen(3000, () => {
                       console.log('App started on port 3000');
                     })
                   })
                   .catch(error => {
                     console.log('ERROR:', error);
                   });
