
//client.js
var io = require('socket.io-client');
var socket = io.connect("http://192.168.1.142:8080", {'reconnection': true, 'reconnectionDelay': 1000, 'reconnectionAttempts': 99999}); // Change to remote host when not on local comp
const sqlite3 = require("sqlite3").verbose();
const fs = require("fs");

// Add a connect listener
socket.once('connect', function (socket) {
  console.log('Connected!');
});

// Channel for Temperature data
socket.on('CH01', function(status){ // Start listening on channel CH01.
   console.log('Status: ', status);
    setTimeout(function() { // Add delay to the sending.
     openTempData(); // Open the db function to send data to server in JSON format.
    }, 3000);
});

// Channel for Humidity data
socket.on('CH02', function(status){ // Start listening on channel CH02.
   console.log('Status: ', status);
    setTimeout(function() { // Add delay to the sending.
     openHumData(); //This is an empty table for now, need the sensor to send first.
    }, 3000);
});

socket.on("reconnecting", (attemptNumber) => {
   console.log("Disconnected from the server, trying to reconnect.");
socket.disconnect();
socket.connect("http://192.168.1.142:8080");
});
// TODO: Create handler to handle the rest of the sensors.

// TODO: Create code for listening for ruleset sent by the server.
//       This will be sent on a channel named by the "RaspberryID" found in /home/pi/mysmarthome/raspberryid
//       This will be triggerd by a save button on the serverside.

function openHumData() {
// Open databasefile.
let db = new sqlite3.Database("/home/pi/PythonBrokerTest/IoT.db"); // DETTE MÅ ENDRES TIL /home/pi/MySmartHome/IoT.db NÅR PRODUKTET ER FERDIG
// SQL statement to select all from table where id is max id (the last input)
let sql = 'SELECT * FROM DHT22_Humidity_Data WHERE ID = (Select MAX(ID) FROM DHT22_Humidity_Data)';

  db.all(sql, [], (err, rows) => {
   if (err) {
    throw err;
  }
  rows.forEach((row) => {
// Read content of the RaspberryID file to find the given ID of this raspberry.
        fs.readFile("/home/pi/MySmartHome/RaspberryID", (err, data) => {
          if (err) throw err;
            var fileContent = data.toString("utf8");
// Set the variables and keys to send as JSON to the server.
	var raspid = fileContent.trim();
	var topic = "humm"; // Sending Topic so that the server is able to see the different sensors.
        var id = row.SensorID;
        var date = row.Date_n_Time;
        var data = row.Humidity;
        var msg = { "RaspberryID":raspid, "Topic":topic, "SensorID":id, "Date":date, "Data":data };
	
   socket.emit("CH02", "Rasperry Pi:", msg);
   });
  });
});

db.close();
}

function openTempData() {
// Open databasefile.
let db = new sqlite3.Database("/home/pi/PythonBrokerTest/IoT.db");
// SQL statement to select all from table where id is max id (the last input)
let sql = 'SELECT * FROM DHT22_Temperature_Data WHERE ID = (Select MAX(ID) FROM DHT22_Temperature_Data)';

  db.all(sql, [], (err, rows) => {
   if (err) {
    throw err;
  }
  rows.forEach((row) => {
// Read content of the RaspberryID file to find the given ID of this raspberry.
	fs.readFile("/home/pi/MySmartHome/RaspberryID", (err, data) => {
	  if (err) throw err;
	    var fileContent = data.toString("utf8");
// Set the variables and keys to send as JSON to the server.
	var raspid = fileContent.trim();
	var topic = "temp";
	var id = row.SensorID;
	var date = row.Date_n_Time;
	var data = row.Temperature;
	var msg = { "RaspberryID":raspid, "Topic":topic, "SensorID":id, "Date":date, "Data":data };
// Emit message.
   socket.emit("CH01", "Rasperry Pi:", msg);
    });
  });
});

db.close();
}
