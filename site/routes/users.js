var express = require('express');
var router = express.Router();
var userControllers = require('../controllers/userControllers')
var { check, validationResult, body } = require("express-validator");

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});


let storeValidation = 
    [
    check("firstName")
    .isLength({min:2})
    .withMessage("El nombre debe tener minimo 2 caracteres"),
    check("lastName").isLength({min:3}).withMessage("El apellido debe tener minimo 3 caracteres"),
    check("email").isEmail().withMessage("El Email ingresado no es válido"),
   
    check("password").isLength({ min: 3 }).withMessage("La constraseña debe tener minimo 3 Caractéres"),
    check('password_repeat', 'Los campos de contraseña no coinciden')
    .exists()
    .custom((value, { req }) => value === req.body.password),
    ];

let upload = require('../middlewares/helperMulter');

let perfil = upload.avatarUpload.any();

let store = userControllers.store;



const userRouter = {
  storeValidation,
  perfil,
  store,
 
};

module.exports = userRouter;
