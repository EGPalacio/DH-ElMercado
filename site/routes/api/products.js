var express = require('express');
var router = express.Router();
var productsAPIController = require("../../controllers/api/productsController");

/* GET actors. */
router.get("/products/", productsAPIController.list);
router.get("/products/detail/:id", productsAPIController.prodDetail);
router.get("/products/categories", productsAPIController.prodCateg);

module.exports = router;
