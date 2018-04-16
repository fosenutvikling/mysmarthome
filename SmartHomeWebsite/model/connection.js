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
 */
function sensor_query(sensorName, payload, raspId, sTopic){
  //Get sensor id from sensor that passed its data
  connection.query("SELECT sensor_id FROM tbl_sensor WHERE sensor_name = '" + sensorName +"'", function(err, res, field){
    if(res.length <= 0)
      connection.query("INSERT INTO tbl_sensor (sensor_name, rasp_id) VALUES ('" + sensorName + "', '" + raspId + "')");    //Add sensor data to table
    connection.query("INSERT INTO tbl_sensor_data (sensor_id, sensor_name, data, topic) VALUES ('" + res[0].sensor_id + "', '" + sensorName + "', '" + payload + "', '" + sTopic +"')");
  })
};

module.exports = {
  connection,
  sensor_query
}