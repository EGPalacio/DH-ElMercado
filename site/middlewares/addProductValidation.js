var { check, validationResult, body } = require("express-validator");

exports.storeValidation = [
  check("name")
    .isLength({ min: 5 })
    .withMessage("El nombre del producto debe tener minimo 2 caracteres"),

  check("description")
    .isLength({ min: 20 })
    .withMessage("La descripción debe tener al menos 20 caracteres"),

  check("price")
    .isLength({ min: 2 })
    .withMessage("El precio  no puede estar vacio"),

  check("imgPortada").custom((value, { req }) => {

    let img = req.files.imgPortada;
    console.log(img);
    

    if (img != undefined) {

      var portadaFile = req.files.imgPortada[0].mimetype;
      
      

      if (
        portadaFile == "image/jpeg" ||
        portadaFile == "image/png" ||
        portadaFile == "image/jpg"
      ) {
        return true;
      } else {
        throw new Error("Error en el formato de la imagen ");
      }
    } else {
      return true;
    }
  }),
];
