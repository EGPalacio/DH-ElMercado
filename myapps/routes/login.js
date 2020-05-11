var express = require('express');
var router = express.Router();
var userControllers = require('../controllers/userControllers')

/* GET Login page. */
router.get('/', userControllers.login);

/* GET Register page. */
router.get('/register/', userControllers.register);

module.exports = router;