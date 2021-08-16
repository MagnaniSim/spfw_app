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

/* Results and professional update */
router.get('/results', auth.is_logged_in, landing.get_landing);
router.post('/proupdate', auth.is_logged_in, landing.update_pro);

/* GET home page. */
router.get('/', auth.is_logged_in, landing.get_landing);
router.post('/', auth.is_logged_in, landing.search);

/* User administration */
router.get('/users', auth.is_admin, user.show_users);
router.get('/user/:user_id', auth.is_admin, user.show_user);
router.get('/user/:user_id/edit', auth.is_admin, user.show_edit_user);
router.post('/user/:user_id/edit', auth.is_admin, user.edit_user);
router.post('/user/:user_id/delete', auth.is_admin, user.delete_user);
router.post('/user/:user_id/delete-json', auth.is_admin, user.delete_user_json)

module.exports = router;
