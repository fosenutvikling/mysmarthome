var sql = require('mysql');

var con = sql.createConnection({
  host: "localhost",
  user: "mysmarthome",
  password: "mysmarthome",
  port : "8080"
});

con.query('CREATE DATABASE IF NOT EXISTS test', function (err) {
    if (err) throw err;
    console.log("database created");
    connection.query('USE test', function (err) {
        if (err) throw err;
        connection.query('CREATE TABLE IF NOT EXISTS users('
            + 'id INT NOT NULL AUTO_INCREMENT,'
            + 'PRIMARY KEY(id),'
            + 'name VARCHAR(30)'
            +  ')', function (err) {
                if (err) throw err;
            });
    });
});