var express = require('express');
var router = express.Router();

// Set Route for users
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
