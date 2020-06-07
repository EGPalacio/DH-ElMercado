var express = require('express');
var router = express.Router();
var cartController = require('../controllers/cartController');

router.get('/cart', cartController.cartStart);
router.post('/cart/:id', cartController.cartAdd);

module.exports = router;