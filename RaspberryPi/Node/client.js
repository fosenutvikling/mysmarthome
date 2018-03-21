//client.js
var io = require('socket.io-client');
var socket = io.connect("http://192.168.1.142:8080", {reconnect: true}); // Change to remote host when not on local comp
const sqlite3 = require("sqlite3").verbose();

// Add a connect listener
socket.on('connect', function (socket) {
   console.log('Connected!');
});

socket.on('CH01', function(status){ // Start listening on channel CH01.
   console.log('Status: ', status);
    setTimeout(function() { // Add delay to the sending.
     openTempData(); // Open the db function to send data to server in JSON format.
     //openHumData(); //This is an empty table for now, need the sensor to send first.
    }, 3000);
})

// TODO: Create handler to handle the rest of the sensors.

function openHumData() {
// Open databasefile.
let db = new sqlite3.Database("/home/pi/PythonBrokerTest/IoT.db");
// SQL statement to select all from table where id is max id (the last input)
let sql = 'SELECT * FROM DHT22_Humidity_Data WHERE ID = (Select MAX(ID) FROM DHT22_Humidity_Data)';

  db.all(sql, [], (err, rows) => {
   if (err) {
    throw err;
  }
  rows.forEach((row) => {
	var topic = "humm"; // Sending Topic so that the server is able to see the different sensors.
        var id = row.SensorID;
        var date = row.Date_n_Time;
        var data = row.Humidity;
        var msg = { "Topic":topic, "SensorID":id, "Date":date, "Data":data };
	
   socket.emit("CH01", "Rasperry Pi:", msg);
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
	var topic = "temp";
	var id = row.SensorID;
	var date = row.Date_n_Time;
	var data = row.Temperature;
	var msg = { "Topic":topic, "SensorID":id, "Date":date, "Data":data };

   socket.emit("CH01", "Rasperry Pi:", msg);
  });
});

db.close();
}


