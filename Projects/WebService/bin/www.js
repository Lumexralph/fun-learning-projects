//runs an http server for the application in app,js

const http = require('http');
const app = require('../app');

const port = +process.env.PORT || 7000;
app.set('port', port);

http.createServer(app).listen(port, () => {
	console.log(`The server is listening on port ${port}`);
});