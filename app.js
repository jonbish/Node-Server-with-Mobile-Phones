var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

app.use(express.static('public'));
server.listen(8080);

io.on('connection', function (socket) {

  console.log('Socket connection started');

  socket.on("connect mobile", function(){
    socket.join('test');
    console.log('Someone entered :' + socket.id);
    io.emit('add user', socket.id);
  });

  //Update the position
  socket.on("update movement", function(id, data){
    console.log('update position for ' +  socket.id);
    io.emit('update position', socket.id, data);
  });

  //Update the state
  socket.on('update touch', function(touchevent){
    console.log('update touch for ' +  socket.id);
    io.emit('update state', socket.id, touchevent);
  });

  //When a user disconnects
  socket.on("disconnect", function(data){
    console.log('Someone left :' + data);
  });
});
