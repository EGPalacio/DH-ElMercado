var express = require('express');
var router = express.Router();
var productsAPIController = require("../../controllers/api/productsController");


/* GET actors. */
router.get("/products", productsAPIController.list);


module.exports = router;
