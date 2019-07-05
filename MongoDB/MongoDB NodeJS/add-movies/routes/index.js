// Handle the route and http methods from client
// export route to be imported by app.js to handle requests

import homePage from '../controller/homePage';
import storeMovies from '../controller/storeMovies';

export default (app, db) => {
  app.get('/', homePage);
  app.post('/add_movie', (req, res, next) => storeMovies(req, res, next, db));
};

