var express = require("express");
var router = express.Router();

var { check, validationResult, body } = require("express-validator");


// Require Sequelize
const db = require("../server/models");
const { Sequelize } = require("../server/models");
const Op = Sequelize.Op;

var userControllers = require("../controllers/userControllers");
const storeValidation = require('../middlewares/registerValidation');
const gestUserCheck = require("../middlewares/guestUserCheck");

let upload = require("../middlewares/helperMulter");

let perfil = upload.avatarUpload.any();


  /* GET Register page. */
router.get("/register/", gestUserCheck.guestCheck, userControllers.register);
router.post(
  "/register/",
  perfil,
  storeValidation.storeValidation,
  userControllers.store
);

//Endpoint
router.get("/register/getemails/:email", userControllers.emailValidation);

module.exports = router;
