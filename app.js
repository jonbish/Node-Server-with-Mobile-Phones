(function(){
  var express = require('express');
  var app = express();
  var server = require('http').Server(app);
  var io = require('socket.io')(server);
  
  var players = [];

  app.use(express.static('public'));
  server.listen(8080);

  io.on('connection', function (socket) {

    console.log('Socket connection started');

    socket.on("connect mobile", function(){
      console.log('Someone entered :' + socket.id);
      socket.broadcast.emit('add user', socket.id);
    });

    socket.on("connect desktop", function(){
      console.log('update desktop', players.length);
      socket.broadcast.emit('update desktop', players);
    });

    socket.on("update players", function(playersArray){
      console.log('update players', playersArray.length);
      players = playersArray;
    });

    //Update the position
    socket.on("update movement", function(data){
      console.log('update position for ' +  socket.id);
      socket.broadcast.emit('update position', socket.id, data);
    });

    //Update the state
    socket.on('update touch', function(touchevent){
      console.log('update state to ' + touchevent + ' for ' +  socket.id);
      socket.broadcast.emit('update state', socket.id, touchevent);
    });

    //When a user disconnects
    socket.on("disconnect", function(data){
      console.log('Someone left :' + data);
      socket.broadcast.emit('remove user', socket.id);
    });
  });
})();