var socket_io = require('socket.io');
var io = socket_io();
var socketApi = {};

socketApi.io = io;

io.on('connection', function (socket){
  socket.on('CH01', function (from, msg) {
    console.log('MSG', from, msg);
    socket.emit('CH01', 'SERVER: Message Recieved');
  });

});

module.exports = socketApi;