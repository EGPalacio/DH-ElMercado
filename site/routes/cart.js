var express = require('express');
var router = express.Router();
var cartController = require('../controllers/cartController');
const gestUserCheck = require('../middlewares/guestUserCheck');

router.get('/cart', gestUserCheck.userCheck, cartController.cartStart);
router.post('/cart/:id', cartController.cartAdd);

module.exports = router;