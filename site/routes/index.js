var express = require('express');
var router = express.Router();
var indexControllers = require('../controllers/indexControllers');
var userControllers = require('../controllers/userControllers');



//Modularizadas
const productsRouter = require('../routes/products')
const cartRouter = require('./cart')
const profileRouter = require('./profile')
const gestUserCheck = require('../middlewares/guestUserCheck');
const searchRouter = require ("./search");
const registerRouter = require('../routes/register');

var { check, validationResult, body } = require("express-validator");

/* GET home page. */
router.get('/', indexControllers.index);
router.get('/blog', indexControllers.blog);

router.get('/prueba', indexControllers.prueba);

/* rutas modularizadas */
router.use(productsRouter).use(cartRouter).use(profileRouter).use(searchRouter).use(registerRouter);

// Rutas Huesped =>
/* GET Login page. */
router.get('/login', gestUserCheck.guestCheck, userControllers.login);

/* Acá está el Login - Session */
router.post('/login', [
    check("email")
    .isEmail()
    .withMessage("Email inválido"),
    check("password")
    .isLength({ min: 3 })
    .withMessage("La constraseña debe tener minimo 3 Caractéres"),
], userControllers.loggedIn);

router.get("/check", function(req, res) {
    if (req.session.usuarioLogueado != undefined) {
        res.send(req.session.usuarioLogueado.firstName)
    } else {
        res.send("No estás logueado");
    }
})



/* LOGOUT page */

router.get('/logout', indexControllers.logout );



module.exports = router;