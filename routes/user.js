var express = require('express');
var router = express.Router();
var path = require('path');
const fs = require('fs');
const multer = require('multer');

const user_controller = require(path.join('..', 'controllers','userController'));

router.get('/', user_controller.login_get);

router.get('/login', user_controller.login_get);

var upload = user_controller.uploadOption;
router.post('/login', upload.single('keystore'), user_controller.login_post);

router.post('/logout', user_controller.logout_post);

router.get('/register', user_controller.register_get);

router.post('/register', user_controller.register_post);

module.exports = router;

// module.express = function(app, path) { }