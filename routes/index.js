var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express', name: 'Julio' });
});

router.get('/about', function(req, res, next) {
  res.render(
    'index', 
    { 
      title: 'About Me',
      name: 'Julio' 
    }
  );
});

module.exports = router;