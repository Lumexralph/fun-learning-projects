const express = require('express');

const port = process.env.PORT || 8080;
const app = express();

//serve up app directory
app.use(express.static('app'));

// Serve up the bower_components directory with an alias of bower_components
// The first parameter, **'/bower_components'**, in the **use** method call is the alias, and needs to have a leading slash.
app.use('/bower_components', express.static('bower_components'));

// when the URL matches this route
app.get('/welcome', (req, res) => res.json({
  message: 'Welcome to Module 2 Homework'
}))

app.listen(port, () => console.log(`Our app is listening on port ${port}...`));