var express = require('express');
var router = express.Router();
var indexControllers = require('../controllers/indexControllers')
var userControllers = require('../controllers/userControllers')

/* GET home page. */

router.get('/', indexControllers.index)

/* GET Login page. */
router.get('/login', userControllers.login);

/* GET Register page. */
router.get('/register/', userControllers.register);

module.exports = router;