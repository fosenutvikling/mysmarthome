var sql = require('mysql');

var connection = sql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'mysmarthome'
});

connection.connect(function(err) {
    if (err) throw err;
});

/**Function that uploads data from sensor to server db.
 *Checks if sensor already exists and is connected to a rasp id(PK -> FK), otherwise create that db connection and upload sensor data table
 *For later: sensor_id = primary key therefore it is unique and multiple instances of it is not allowed in db table - problematic
 *connection.query("SELECT * FROM tbl_sensor WHERE sensor_id = '" + sensorId +"' AND rasp_id = '" + raspId +"'"
 */
function sensor_query(sensorId, payload, raspId ){
  connection.query("SELECT sensor_id FROM tbl_sensor WHERE sensor_name = '" + sensorId +"'", function(err, res, field){
    if(res.length <= 0)
      connection.query("INSERT INTO tbl_sensor (sensor_name, rasp_id) VALUES ('" + sensorId + "', '" + raspId + "')");
    connection.query("INSERT INTO tbl_sensor_data (sensor_name, data) VALUES ('" + sensorId + "', '" + payload + "')");
  })
};

module.exports = {
  connection,
  sensor_query
}