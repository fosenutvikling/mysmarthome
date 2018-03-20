var express = require('express');
var router = express.Router();


// Set Route for Home 
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/login', function (req, res) {
  res.render('temperature', {
  });
})

router.get('/signup', function (req, res) {
  res.render('signup');
})

module.exports = router;
