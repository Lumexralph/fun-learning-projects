// entry point for the application

import http from 'http';
import app from '../app';


const port = parseInt(process.env.PORT, 10) || 8000;
app.set('port', port);

const server = http.createServer(app);

server.listen(port);
console.log('Express server listening on port %s.', port);
