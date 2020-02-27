var express = require('express');

var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);
var PORT = 20535;
server.listen(PORT);
console.log('Server is up and running on PORT ', PORT);

var connections = [];

io.sockets.on('connection', function(socket) {
   connections.push(socket);
   console.log(connections.length, ' sockets are connected');

   socket.on('disconnect', function() {
      connections.splice(connections.indexOf(socket), 1);
   });

   socket.on('sending message', function(message) {
      console.log('Message is received :', message);

      io.sockets.emit('new message', {message: message});
   });
});

app.get('/', function(request, response) {
   response.sendfile(__dirname + '/index.html');
});