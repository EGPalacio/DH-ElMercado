var express = require('express');
var router = express.Router();
var indexControllers = require('../controllers/indexControllers')
var userControllers = require('../controllers/userControllers')
var cartController = require('../controllers/cartController')

/* GET home page. */
router.get('/', indexControllers.index);

/* GET Login page. */
router.get('/login', userControllers.login);

/* GET Register page. */
router.get('/register/', userControllers.register);
router.post('/register/', userControllers.store);

/* GET Cart. */
router.get('/cart/', cartController.cartStart);
router.post('/cart/:id', cartController.cartAdd);

module.exports = router;