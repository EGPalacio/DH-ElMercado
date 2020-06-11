var express = require('express');
var router = express.Router();
var indexControllers = require('../controllers/indexControllers')
var userControllers = require('../controllers/userControllers')
var cartRouter = require('./cart')
var userRouter = require('./users');
const profileRouter = require('./profile')
const gestUserCheck = require('../middlewares/guestUserCheck');


var { check, validationResult, body } = require("express-validator");


// Rutas Huesped =>
/* GET home page. */
router.get('/', indexControllers.index)
    /* GET Cart. */
router.get('/cart', gestUserCheck.userCheck, cartRouter);

/* GET Login page. */
router.get('/login', gestUserCheck.guestCheck, userControllers.login);
/* GET Profile page. */
router.get('/profile', profileRouter);
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

router.get('/register/', userRouter.vistaRegistro);
router.post('/register', userRouter.perfil, userRouter.storeValidation, userRouter.store);



module.exports = router;