var express = require('express');
var session = require('express-session');
var router = express.Router();

var db = require('../model/connection');
//expanding: use cookies instead of global variables
var sess;
// Set Route for Home 
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/login', function (req, res) {
  res.render('login', {
  });
})

router.get('/signup', function (req, res) {
  res.render('signup');
})

router.get('/temperature', function(req, res) {
	res.render('temperature');
})

router.get('/linkrasp', function(req, res) {
	res.render('linkraspberry');
})

// in query '"+sess.gateway+"'
router.get('/sensors', function(req, res){
	db.connection.query("SELECT sensor_id, sensor_name FROM tbl_sensor WHERE rasp_id = 'raspmartin'", function(err, rows){
		if(err)
			console.log("Error selecting: %s", err);
		res.render('sensors', {sensor: rows});
	});
})
//Display chosen sensors data
router.get('sensors/:id', function(req, res){
	db.connection.query("SELECT * FROM tbl_sensor_data WHERE sensor_id = ?", [req.params.id], function(err, res){
		if(err)
			throw err;
		res.render('sensors/:id')
	})
})

//expanding: Handling validation - username/email
//('" +req.body.username+ "', '" +req.body.password+ "')
router.post('/signup_user', function(req, res){
	var values = [
	[req.body.username, req.body.password]
	];
	db.connection.query("INSERT into tbl_users (name, password) VALUES ? ",[values], function(err, res){
		if(err)
			throw err;
		//Direct user to logged in state and start session/cookie
	});
});

// "Logs user in" sets user id to session key
//expanding: Robust session handling thats not memory based
router.post('/login_user', function(req, res){
	sess = req.session;
	db.connection.query("SELECT * FROM tbl_users WHERE name = '" +req.body.username+"' AND password = '" +req.body.password+"'", function(err, res){
      if(err)
        throw err;
      sess.userid  = res[0].user_id;
    });
	res.redirect('/linkrasp');
});

//Post for linking raspberry to user
//expanding: Database table consisting of produced/shipped gateways for link between gateway and user in relational database(A check if given raspberry actually exists)
router.post('/linkrasp', function(req, res){
	db.connection.query("INSERT into tbl_raspberry (rasp_id, user_id) VALUES ('" +req.body.raspberry+ "', '" +sess.userid+ "')", function(err, res){
		if(err)
			throw err;
		//store gateway in session for sensor table
		sess.gateway = req.body.raspberry;	
	});
	res.redirect('./');
});



module.exports = router;
