var socket_io = require('socket.io');
var io = socket_io();
var socketApi = {};
var db = require("../model/connection");
socketApi.io = io;

io.on('connect', function (socket){ // Socket connection
	var sessionid = socket.id; // Store the ID of the connected client.
	console.log(sessionid);
   console.log('connection'); // If connection successful, print.
   socket.emit("CH01", "Connecting to the server"); // Trigger message to start the listener on the client side.
   socket.emit("CH02", "Channel 2"); // Trigger for channel 2 humidity

  socket.on('CH01', function (from, msg) { // Listen on channel CH01 and write what is sent from the client.
    console.log('MSG', from, msg);
    db.sensor_query(msg.SensorID.toString(), msg.Data.toString(), msg.RaspberryID.toString(), msg.Topic.toString());
    socket.emit('CH01', msg.Topic); // msg is a JSON object, .Topic, .Date and .Data is available.
  });
  socket.on('CH02', function (from, msg) { // Listen on channel CH02 and write what is sent from the client.
    console.log("MSG", from, msg);
    db.sensor_query(msg.SensorID.toString(), msg.Data.toString(), msg.RaspberryID.toString(), msg.Topic.toString());
    socket.emit("CH02", msg.Topic);
  });
});


module.exports = socketApi;