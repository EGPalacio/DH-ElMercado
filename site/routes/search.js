var express = require('express');
var router = express.Router();
var searchController = require("../controllers/searchController");

router.get('/search', searchController.search);

module.exports = router;