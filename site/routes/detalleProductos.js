var express = require('express');
var router = express.Router();
var productoControllers = require('../controllers/detalleProductosControllers')

/* GET home page. */
router.get('/:id', productoControllers.productos)

module.exports = router;
