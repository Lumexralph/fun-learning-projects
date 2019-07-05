const express = require('express'),
      mongoskin = require('mongoskin'),
      bodyParser = require('body-parser'),
      logger = require('morgan');

// create an instance which is a server object
const app = express();

// middleware to extract data from request
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.use(logger());

// connect to db
const db = mongoskin.db('mongodb://localhost:27017/test', { safe: true });

// helper function to convert hexadecimal string to MongoDB ObjectID
const id = mongoskin.helper.toObjectID;

// if you get a parameter (:string) in the URL
// middleware to handle the URL
// get collection from the database, assign it to collection
// property of the req object
app.param('collectionName', (req, res, next, collectionName) => {
  req.collection = db.collection(collectionName);
  return next();
});

// routes
app.get('/', (req, res, next) => {
  res.send('Select a collection, e.g  /collections/messages');
});

// retrieve list of items sorted by _id
app.get('/collections/:collectionName', (req, res, next)=>{
  req.collection.find({}, {
    limit: 10,
    sort: [['_id', -1]]
  }).toArray((error, results) => {
    if (error) {
      return next(error);
    } else {
      res.send(results);
    }
  });
});

// create any data in the db
app.post('/collections/:collectionName', (req, res, next) => {
  if (!req.body.name || !req.body.email) {
    return res.send({ msg: 'Incomplete data, name and email' });
  }
  req.collection.insert(req.body, {}, (error, results) => {
    if (error) {
      return next(error);
    } else {
      res.send(results);
    }
  });
});

app.get('/collections/:collectionName/:id', (req, res, next) => {
  req.collection.findOne({
    _id: id(req.params.id)
  }, (error, result) => {
    if (error) {
      return next(error);
    }
    if (!result) {
     return res.send({ msg: 'data cannot be found' });
    }
    res.send(result);
  })
} );

app.put('/collections/:collectionName/:id', (req, res, next) => {
  req.collection.update({
    _id: id(req.params.id)
  }, { $set: { 
    name: req.body.name,
    email: req.body.email  
  } }, { safe: true, multi: false },
 (error, data) => {
   if (error) {
     return next(error);
   }
   result = data.result;
   console.log(result);
   if ( result.n === 1 && result.nModified === 0) {
     return res.send({ msg: 'data already up-to-date' });
   }
   res.send( ( result.nModified === 1 && result.n === 1 ) ? { msg: 'success' } : { msg: 'error' })
 }
);
});

app.del('/collections/:collectionName/:id', (req, res, next) => {
 req.collection.remove({
   _id: id(req.params.id)
 }, (error, data) => {
   if (error) {
     return next(error);
   }
   result = data.result.n;
   if (result === 0) {
     return res.send({ msg: 'data not found to be removed' });
   }
   res.send( (result === 1) ? { msg: 'success' } : { msg: 'error' } )
 });
});

// start the server
app.listen(8000, () => {
  console.log(`Server is listening on port 8000`);
});