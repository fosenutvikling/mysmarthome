var socket_io = require('socket.io');
var io = socket_io();
var socketApi = {};
var db = require("../model/connection");
socketApi.io = io;

io.on('connection', function (socket){ // Socket connection
   console.log('connection'); // If connection successful, print.
   socket.emit("CH01", "Connecting to the server"); // Trigger message to start the listener on the client side.
  socket.on('CH01', function (from, msg) { // Listen on channel CH01 and write what is sent from the client.
    if (msg.Topic === "temp") { // If topic is temperature
    //console.log('MSG', from, msg);
    //db.sensor_query(msg.SensorID.toString(), msg.Data.toString(), msg.RaspberryID.toString(), msg.Topic.toString());
    socket.emit('CH01', 'SERVER: Message Recieved with the Topic: ' + msg.Topic); // msg is a JSON object, .Topic, .Date and .Data is available.

    //socket.disconnect(true);

    } else if(msg.Topic === "humm") {
        if (msg.Data === null)
          console.log("No data available");
      //console.log("MSG", from, msg);
      //db.sensor_query(msg.SensorID.toString(), msg.Data.toString(), msg.RaspberryID.toString(), msg.Topic.toString());
      socket.emit("CH01", "SERVER: Message Recieved with the Topic: " + msg.Topic);
    } else {
      console.log("No known topic given");
    }
  });

});


module.exports = socketApi;