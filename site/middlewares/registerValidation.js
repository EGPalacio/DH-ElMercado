var { check, validationResult, body } = require("express-validator");
// Require Sequelize
const db = require("../server/models");
const { Sequelize } = require("../server/models");
const Op = Sequelize.Op;

exports.storeValidation = [
    check("first_name")
        .isLength({min:2})
        .withMessage("El nombre debe tener minimo 2 caracteres"),
    
    check("last_name")
        .isLength({min:2})
        .withMessage("El apellido debe tener minimo 2 caracteres"),
   
    check("email")
        .isEmail()
        .withMessage("El Email ingresado no es válido")
        .custom(value => {
        return db.User.findOne({where : {email : value }})
        .then(user => {
         if (user) {
            throw new Error('El correo ingresado ya se encuentra registrado');
          }
          });
        }),

 
   
    check("password")
    
        .isLength({ min: 8 })
        .withMessage("La constraseña debe tener minimo 8 Caractéres")
        .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/, "i")
        .withMessage("La constraseña debe tener al menos una letra mayuscula, una minuscula y un numero")
        ,


    check('password_repeat', 'Los campos de contraseña no coinciden')
        .exists()
        .custom((value, { req }) => value === req.body.password),

    check('avatar')
    .custom((value, { req }) => {

        console.log(value);

        if (req.files[0]) {
            var avatarFile =req.files[0].mimetype;

            if ( avatarFile == 'image/jpeg' || avatarFile == 'image/png' || avatarFile == 'image/jpg' ) {
                return true;
            } else {
                throw new Error("Error en el formato de la imagen ");
            }


        } else {
            return true;
        }
    }) 
        
       
        
    ];