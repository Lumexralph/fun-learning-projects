import dotenv from 'dotenv';
import express from 'express';
import http from 'http';
import path from 'path';
import mongoose from 'mongoose';
// Middleware modules
import session from 'express-session';
import logger from 'morgan';
import errorHandler from 'errorhandler';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import everyauth from 'everyauth';
import methodOverride from 'method-override';
import stylus from 'stylus';
import { listUsers, login, logout, authenticate } from './routes/user';
import { show, listArticles, add, edit, del, post, postArticle, admin } from './routes/article';
import index from './routes/index';
import models from './models/index';

// if in production environment don't load the variables
if (process.env.NODE_ENV !== 'production') {
  dotenv.load();
}

// extract the key and secret for twitter authentication 
const TWITTER_CONSUMER_KEY = process.env.TWITTER_CONSUMER_KEY,
  TWITTER_CONSUMER_SECRET = process.env.TWITTER_CONSUMER_SECRET;

const dbUrl = process.env.MONGOHQ_URL || 'mongodb://localhost:27017/blog';
// connect to db
mongoose.connect(dbUrl, { safe: true });

// twitter authentication using everyauth
everyauth.debug = true;
everyauth.twitter
  .consumerKey(TWITTER_CONSUMER_KEY)
  .consumerSecret(TWITTER_CONSUMER_SECRET)
  .findOrCreateUser(function twitter(
    session,
    accessToken,
    accessTokenSecret,
    twitterUserMetadata
  ) {
    const promise = this.Promise();
    process.nextTick(() => {
      if (twitterUserMetadata.screen_name === 'Ogundeleolu') {
        session.user = twitterUserMetadata;
        session.admin = true;
      }
      promise.fulfill(twitterUserMetadata);
    });
    return promise;
  })
  .redirectPath('/admin');

// We need it because otherwise the session will be kept alive
everyauth.everymodule.handleLogout(logout);
everyauth.everymodule.findUserById((user, callback) => {
  callback(user);
});

// middlewares to work on request before
// it gets to route and route handler

// instantiate the express object
const app = express();
app.locals.appTitle = 'Blog-Xpress';

// to expose Mongoskin/MongoDB collections in each routes
// via req(request) object
app.use((req, res, next) => {
  if (!models.Article || !models.User) {
    return next(new Error('No models.'));
  }
  req.models = models;
  return next(); // next should be called otherwise request stalls, the next middleware
});

// configure express app
// set up port number and template engine
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// middleware to log requests, parse JSON input,
// use stylus and server static content
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(cookieParser('3CCC4ACD-6ED1-4844-9217-82131BDCB239')); // authentication
app.use(session({ secret: '2C44774A-D649-4D44-9535-46E296EF984F' })); // authorization
app.use(everyauth.middleware());
app.use(bodyParser.urlencoded());
app.use(methodOverride());
app.use(stylus.middleware(`${__dirname}/public`));
app.use(express.static(path.join(__dirname, 'public')));

// Authentication middleware
app.use((req, res, next) => {
  if (req.session && req.session.admin) {
    res.locals.admin = true;
  }
  next(); // call the next route handler
});

// Authorization middleware
const authorize = (req, res, next) => {
  if (req.session && req.session.admin) {
    return next();
  }
  return res.send(401);
};

// to handle error in development environment
if (app.get('env') === 'development') {
  app.use(errorHandler());
}

// PAGES and ROUTES
app.get('/', index);
app.get('/login', login);
app.post('/login', authenticate);
// if you use everyauth, this /logout route is overwriting by 
// everyauth automatically, therefore we use custom/additional handleLogout
app.get('/logout', logout);
app.get('/admin', authorize, admin);
app.get('/post', authorize, post);
app.post('/post', postArticle);
app.get('/articles/:slug', show);

// REST API ROUTES
app.all('/api', authorize); // authorize all API routes
app.get('/api/articles', listArticles);
app.post('/api/articles', add);
app.put('/api/articles/:id', edit);
app.delete('/api/articles/:id', del);

// Route to handle wrong URL from user
app.all('*', (req, res) => {
  res.status(404).send({ message: 'Resource not found!' });
});


// create the server
const server = http.createServer(app);
const port = app.get('port');
const boot = () => {
  server.listen(
    port, () => {
      console.info(`Blog Express server is listening on port ${app.get('port')}`);
    });
};

const shutdown = () => server.close();

if (require.main === module) {
  boot();
} else {
  console.info('Running app as a module');
}
export { port, boot, shutdown };
