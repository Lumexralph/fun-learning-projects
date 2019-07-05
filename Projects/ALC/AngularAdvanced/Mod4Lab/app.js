const express = require('express');

const app = express();

// to serve up static files from a directory called 'public'
app.use(express.static('public'));
app.use('/angular', express.static('node_modules/angular'));
app.use('**/bootstrap', express.static('node_modules/bootstrap/dist/css'));


// launch the express server
app.listen(3000, () => console.log('Server listening on port 3000'));