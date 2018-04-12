var socket_io = require('socket.io');
var io = socket_io();
var socketApi = {};
var db = require("../model/connection");
socketApi.io = io;

io.on('connect', function (socket){ // Socket connection
	var sessionid = socket.id; // Store the ID of the connected client.
	console.log(sessionid);
   console.log('connection'); // If connection successful, print.

   socket.emit("CH01", "Connecting to channel 1: Temperature"); // Trigger message to start the listener on the client side.
   socket.emit("CH02", "Connecting to channel 2: Humidity"); // Trigger for channel 2 humidity

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
  socket.on("disconnect", function() {
  	console.log("Client disconnected");
  })

  // To disconnect the client when the server is stopped using ctrl-c.
  // The ctrl-c comes in as a sigint and trigger the socket.disconnect();
  process.on("SIGINT", () => {
	console.log("Caught SIGINT. Exiting in 2 seconds.");
	//socket.disconnect(true);
		//socket.socket.io.reconnect();
	
		setTimeout(() => {
			console.log("\nKilling process");
			socket.disconnect(true);
			process.exit(0);
		}, 2000);
	})
});




module.exports = socketApi;