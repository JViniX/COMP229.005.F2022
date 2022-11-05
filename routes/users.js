let express = require('express');
let router = express.Router();
let usersController = require('../controllers/user');
let passport = require('passport');

/* GET users listing. */

router.post('/signup', usersController.signup);

router.post('/signin', usersController.signin);

module.exports = router;
