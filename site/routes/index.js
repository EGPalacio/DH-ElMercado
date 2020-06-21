var express = require('express');
var router = express.Router();
var indexControllers = require('../controllers/indexControllers')
var userControllers = require('../controllers/userControllers')
var userRouter = require('./users');

//Modularizadas
const productsRouter = require('../routes/products')
const cartRouter = require('./cart')
const profileRouter = require('./profile')
const gestUserCheck = require('../middlewares/guestUserCheck');

var { check, validationResult, body } = require("express-validator");

/* GET home page. */
router.get('/', indexControllers.index);
router.get('/blog', indexControllers.blog);

/* rutas modularizadas */
router.use(productsRouter).use(cartRouter).use(profileRouter);

// Rutas Huesped =>
/* GET Login page. */
router.get('/login', gestUserCheck.guestCheck, userControllers.login);

/* Acá está el Login - Session */
router.post('/login', [
    check("email").isEmail().withMessage("Email inválido"),
    check("password").isLength({ min: 3 }).withMessage("La constraseña debe tener minimo 3 Caractéres"),
], userControllers.loggedIn);

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