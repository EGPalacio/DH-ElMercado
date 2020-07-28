var express = require('express');
var router = express.Router();


//Modularizadas
const products = require ("./products");

/* rutas modularizadas */
router.use(products);

module.exports = router;