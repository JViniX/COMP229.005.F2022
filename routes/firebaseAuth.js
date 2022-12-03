var express = require('express');
var router = express.Router();
let firebaseAuthControler = require('../controllers/firebaseAuth');

/* GET home page. */
router.post('/signup', firebaseAuthControler.signup);

module.exports = router;