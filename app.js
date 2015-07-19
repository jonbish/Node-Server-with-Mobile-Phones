var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

// app.configure(function(){
//     app.use(express.methodOverride());
//     app.use(express.bodyParser());
//     app.use(app.router);
// });

// app.configure('development', function(){
//     app.use(express.static(__dirname + '/public'));
//     app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
// });

// app.configure('production', function(){
//   var oneYear = 31557600000;
//   app.use(express.static(__dirname + '/public', { maxAge: oneYear }));
//   app.use(express.errorHandler());
// });

app.use(express.static('public'));
server.listen(8080);

//var rooms = [];

// function room(roomSocket, roomId){
//   this.roomSocket = roomSocket;
//   this.roomId = roomId;
//   this.mobileSockets = [];
// };

io.on('connection', function (socket) {

  console.log('Socket connection started');

  // socket.on("new room", function(data){
  //   rooms.push(new room(socket, data.room));
  // });

  socket.on("connect mobile", function(){

    socket.join('test');
    console.log('Someone entered :' + socket.id);
    io.emit('add user', socket.id);
    // var desktopRoom = null;
    // for(var i = 0; i < rooms.length; i++){
    //   if(rooms[i].roomId == data.room){
    //     desktopRoom = i;
    //     console.log('Someone entered :' + data);
    //   }
    // }
    // if(desktopRoom !== null){
    //   rooms[desktopRoom].mobileSockets.push(socket);
    //   // socket.set('roomi', desktopRoom, function(){}) 
    //   socket.join(desktopRoom);
    //   fn({registered: true});
    //   rooms[socket.store.data.roomi].roomSocket.emit('add user', socket.id, data);
    // }else{
    //   fn({registered: false, error: "No live desktop connection found"});
    // }
  });

  //Update the position
  socket.on("update movement", function(id, data){
    // if(typeof socket.store.data.roomi !== 'undefined'){
    //   if(typeof rooms[socket.store.data.roomi] !== 'undefined'){
    //     rooms[socket.store.data.roomi].roomSocket.emit('update position', socket.id, data);
    //   }
    // }
    console.log('update position for ' +  socket.id);
    io.emit('update position', socket.id, data);
  });


  //When a user disconnects
  socket.on("disconnect", function(data){
    console.log('Someone left :' + data);

    // if(typeof socket.store.data.roomi == 'undefined'){
    //   for(var i in rooms){
    //     if(rooms[i].roomSocket.id == socket.id){
    //       destroyThis = rooms[i];
    //       console.log('Someone left :' + data);
    //     }
    //   }
    //   if(destroyThis !== null){rooms.splice(destroyThis, 1);}
    //   console.log(rooms.length);
    // }else{
    //   var roomId = socket.store.data.roomi;
    //   for(var i in rooms[roomId].mobileSockets){
    //     if(rooms[roomId].mobileSockets[i] == socket){
    //       destroyThis = i;
    //     }
    //   }
    //   if(destroyThis !== null){rooms[roomId].mobileSockets.splice(destroyThis, 1);}
    //   rooms[roomId].roomSocket.emit('remove user', socket.id);
    // }
  });
});
