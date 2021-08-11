var express = require('express');
var router = express.Router();

let landing = require('../controllers/landing');
let user = require('../controllers/user');
let auth = require('../middleware/auth');

router.get('/login', user.show_login);
router.get('/signup', user.show_signup);
router.post('/login', user.login);
router.post('/signup', user.signup);
router.post('/logout', user.logout);
router.get('/logout', user.logout);

/* GET home page. */
router.get('/', auth.is_logged_in, landing.get_landing);
router.post('/', landing.search);


module.exports = router;
