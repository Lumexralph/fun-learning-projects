/* 
GET - List all users
*/

const listUsers = (req, res) => res.send('respond with a resource');

// GET - Login page
const login = (req, res) => res.render('login');

// GET - Logout route
const logout = (req, res) => {
  // end the present session
  req.session.destroy();
  res.redirect('/');
};

// POST - authenticate route
const authenticate = (req, res, next) => {
  // check the request body
  if (!req.body.email || !req.body.password) {
    return res.render('login', { error: 'Please eneter your email and password.' });
  }
  // search for user in db model/collections
  req.models.User.findOne({
    email: req.body.email,
    password: req.body.password
  }, (error, user) => {
    if (error) {
      return next(error);
    }
    if (!user) {
      return res.render('login', { error: 'Incorrect email or passowrd' });
    }
    req.session.user = user;
    req.session.admin = user.admin;
    res.redirect('/admin');
  });
};


export { listUsers, login, logout, authenticate };
