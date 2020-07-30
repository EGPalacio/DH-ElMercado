var express = require('express');
var router = express.Router();
var productsAPIController = require("../../controllers/api/productsController");

/* GET actors. */
router.get("/products/", productsAPIController.list);
router.get("/products/categories", productsAPIController.prodCateg);
router.get("/products/:id", productsAPIController.prodDetail);

module.exports = router;
