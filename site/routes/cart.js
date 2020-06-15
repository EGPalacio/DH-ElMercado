var express = require('express');
var router = express.Router();
var cartController = require('../controllers/cartController');

router.get('/', cartController.cartStart);
router.post('/:id', cartController.cartAdd);

module.exports = router;