var express = require('express');
var router = express.Router();
var profileController = require('../controllers/profileController');
var { check, validationResult, body } = require("express-validator");

let upload = require('../middlewares/helperMulter');
let perfil = upload.avatarUpdate.any();

router.get('/profile', profileController.profile);
router.get('/profile/edit/:id', profileController.edit);
router.post('/profile/edit/:id', perfil, [
    check("first_name")
        .isLength({min:2})
        .withMessage("El nombre debe tener minimo 2 caracteres"),
    check("password")
        .isLength({ min: 8 })
        .withMessage("La constraseña debe tener minimo 8 Caractéres")
        .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/, "i")
        .withMessage("La constraseña debe tener al menos una letra mayuscula, una minuscula y un numero"),
    check("last_name")
        .isLength({min:2})
        .withMessage("El apellido debe tener minimo 2 caracteres"),
    check("email")
        .isEmail()
        .withMessage("El Email ingresado no es válido"),
], profileController.save);

module.exports = router;