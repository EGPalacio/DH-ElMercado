var express = require('express');
var router = express.Router();
var userControllers = require('../controllers/userControllers')

/* GET home page. */
router.get('/', userControllers.login)

module.exports = router;