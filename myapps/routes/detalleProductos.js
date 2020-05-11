var express = require('express');
var router = express.Router();
var productoControllers = require('../controllers/detalleProductosControllers')

/* GET home page. */
router.get('/detail/:id/:category', productoControllers.productos)

module.exports = router;
