const WebSocketServer = require('ws').Server,
      wss = new WebSocketServer({ port: 8080 });

wss.on('connection', (ws) => {
  ws.send('XYZ');
  ws.on('message', (message) => {
    console.log(`received: %s, ${message}`);
  });
});

      

