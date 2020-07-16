var { check, validationResult, body } = require("express-validator");

exports.storeValidation = [
    check("name")
    .isLength({ min: 5 })
    .withMessage("El nombre del producto debe tener minimo 5 caracteres"),

    check("description")
    .isLength({ min: 20 })
    .withMessage("La descripción debe tener al menos 20 caracteres"),

    check("price")
    .isNumeric()
    .withMessage("El precio  no puede estar vacio"),

    // check("imgPortada").custom((value, { req }) => {
    //     let img = req.files.imgPortada;

    //     if (img != undefined) {
    //         var portadaFile = req.files.imgPortada[0].mimetype;

    //         if (
    //             portadaFile == "image/jpeg" ||
    //             portadaFile == "image/png" ||
    //             portadaFile == "image/jpg"
    //         ) {
    //             return true;
    //         } else {
    //             throw new Error("Error en el formato de la imagen ");
    //         }
    //     } else {
    //         return true;
    //     }
    // }),
    // check("gallery").custom((value, { req }) => {
    //     let gallery = req.files.gallery;
    //     let validas = 0;

    //     if (gallery != undefined) {
    //         for (i = 0; i < gallery.length; i++) {
    //             let galleryFiles = gallery[i].mimetype;

    //             if (
    //                 galleryFiles == "image/jpeg" ||
    //                 galleryFiles == "image/png" ||
    //                 galleryFiles == "image/jpg"
    //             ) {
    //                 validas++;
    //             } else {
    //                 validas--;
    //             }
    //         }

    //         console.log(validas);
    //         console.log(gallery.length);

    //         if (validas < gallery.length) {
    //             throw new Error("Error en el formato de la imagen ");
    //         } else {
    //             return true;
    //         }
    //     } else {
    //         return true;
    //     }
    // }),
];