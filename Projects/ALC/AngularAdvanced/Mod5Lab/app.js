var express = require('express');
var app = express();

app.use(express.static('public'));

// Since we are running a web server with Express, we need to tell the web server that if the file isn't found in the public folder to serve up the root URL. This will let Angular take over from there. This is essentially the same as placing an index.html file in your root directory, but this approach allows you the control of placing your files in a separate directory that will be public facing while keeping your server-specific files safe

app.use((req, res) => res.sendFile(`${__dirname}/public/index.html`));

app.listen(2319, () => console.log('App listening on port 2319...'));