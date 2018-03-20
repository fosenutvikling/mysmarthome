var socket_io = require('socket.io');
var io = socket_io();
var socketApi = {};

socketApi.io = io;


/*io.on('connection', function (socket){
  socket.on('CH01', function (from, msg) {
    console.log('MSG', from, msg);
    socket.emit('CH01', 'SERVER: Message Recieved');
  });

}); */

io.on('connection', function (socket){ // Socket connection
   console.log('connection'); // If connection successful, print.
   socket.emit("CH01", "Connecting to the server"); // Trigger message to start the listener on the client side.
  socket.on('CH01', function (from, msg) { // Listen on channel CH01 and write what is sent from the client.
    if (msg.Topic === "temp") { // If topic is temperature
    console.log('MSG', from, msg);
    socket.emit('CH01', 'SERVER: Message Recieved with the Topic: ' + msg.Topic); // msg is a JSON object, .Topic, .Date and .Data is available.
    
    } else if(msg.Topic === "humm") {
        if (msg.Data === NULL)
          console.log("No data available");
      console.log("MSG", from, msg);
      socket.emit("CH01", "SERVER: Message Recieved with the Topic: " + msg.Topic);
    } else {
      console.log("No known topic given");
    }
  });

});

module.exports = socketApi;