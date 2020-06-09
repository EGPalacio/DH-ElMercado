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
router.post('/register',  upload.avatarUpload.any(), 
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
    ],

 userControllers.store
 );


module.exports = router;