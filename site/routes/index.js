var express = require('express');
var router = express.Router();
var indexControllers = require('../controllers/indexControllers')
var userControllers = require('../controllers/userControllers')
var cartRouter = require('./cart')
var { check, validationResult, body } = require("express-validator");

var upload = require('../middlewares/helperMulter');

// Rutas Huesped =>
/* GET home page. */
router.get('/', indexControllers.index)
    /* GET Cart. */
router.get('/cart', cartRouter);


// Rutas Login =>
/* GET Login page. */
router.get('/login', userControllers.login);
/* Acá está el Login - Session */
router.post('/login', [
    check("email").isEmail().withMessage("Email inválido"),
    check("password").isLength({ min: 3 }).withMessage("La constraseña debe tener minimo 3 Caractéres"),
], userControllers.loggedIn);

router.get("/c", function(req, res) {
    console.log(req.cookies.recordame);

})

router.get("/check", function(req, res) {
    if (req.session.usuarioLogueado != undefined) {
        res.send(req.session.usuarioLogueado.firstName)
    } else {
        res.send("No estás logueado");
    }
})

/* GET Register page. */
router.get('/register/', userControllers.register);
router.post('/register/', [
    
    check("firstName").isLength({min:3}).withMessage("El nombre debe tener minimo 3 caracteres"),
    check("lastName").isLength({min:3}).withMessage("El apellido debe tener minimo 3 caracteres"),
    check("email").isEmail().withMessage("El Email ingresado no es válido"),
    check("password").isLength({ min: 3 }).withMessage("La constraseña debe tener minimo 3 Caractéres"),
    check('password').custom((value, { req }) => {
        if (value !== req.body.password_repeat) {
          throw new Error('No coinciden las contraseñas ingresadas');
        }
      }).withMessage("No coinciden las contraseñas ingresadas"),
], upload.avatarUpload.any(), userControllers.store);


module.exports = router;