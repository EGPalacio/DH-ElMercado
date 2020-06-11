var express = require('express');
var router = express.Router();
var profileController = require('../controllers/profileController');

router.get('/profile', profileController.profile);

module.exports = router;