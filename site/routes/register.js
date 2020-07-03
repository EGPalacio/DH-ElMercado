var express = require('express');
var router = express.Router();

var { check, validationResult, body } = require("express-validator");

// Require Sequelize
const db = require('../server/models');
const { Sequelize } = require('../server/models');
const Op = Sequelize.Op


var userControllers = require('../controllers/userControllers')

const gestUserCheck = require('../middlewares/guestUserCheck');


let upload = require('../middlewares/helperMulter');

let perfil = upload.avatarUpload.any();




let storeValidation = 
    [
    check("first_name")
    .isLength({min:2})
    .withMessage("El nombre debe tener minimo 2 caracteres"),
    check("last_name").isLength({min:2}).withMessage("El apellido debe tener minimo 2 caracteres"),
    check("email")
    .isEmail().withMessage("El Email ingresado no es válido"),
   
   
   
    check("password").isLength({ min: 3 }).withMessage("La constraseña debe tener minimo 3 Caractéres"),
    check('password_repeat', 'Los campos de contraseña no coinciden')
    
    .exists()
    .custom((value, { req }) => value === req.body.password),
    ];


/* GET Register page. */
router.get('/register/', gestUserCheck.guestCheck, userControllers.register);
router.post('/register/', upload.avatarUpload.any(), storeValidation, userControllers.store);

module.exports = router;