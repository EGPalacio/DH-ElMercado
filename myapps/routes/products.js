var express = require('express');
var router = express.Router();
var productControllers = require('../controllers/productControllers')


/* GET home page. */

//router.get('/', productControllers.index)
router.get('/detail/:id/:category', productControllers.productos)

/* GET Login page. */
router.get('/add', productControllers.add);



module.exports = router;