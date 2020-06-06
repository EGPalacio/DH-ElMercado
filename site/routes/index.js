var express = require('express');
var router = express.Router();
var indexControllers = require('../controllers/indexControllers')
var userControllers = require('../controllers/userControllers')
var cartController = require('../controllers/cartController')
var logMiddleware = require("../middlewares/logMiddleware");
var {check, validationResult, body} = require("express-validator");

var upload = require('../middlewares/helperMulter');

/* GET home page. */
router.get('/', indexControllers.index)

/* GET Login page. */
router.get('/login', userControllers.login);
router.post('/login', [
  check("email").isEmail().withMessage("Email inválido"),
  check("password").isLength({min:3}).withMessage("La constraseña debe tener minimo 3 Caractéres"),
],
logMiddleware,userControllers.loggedIn);

/* GET Register page. */
router.get('/register/', userControllers.register);
router.post('/register/', upload.avatarUpload.any(), userControllers.store);

/* GET Cart. */
router.get('/cart/', cartController.cartStart);
router.post('/cart/:id', cartController.cartAdd)

module.exports = router;