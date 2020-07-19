const path = require("path");
const dirPaths = require("./dirPaths");

const multer = require("multer");

//Nombre del archivo para la imagen de perfil
let filename = function (req, file, cb) {
  cb(null, file.fieldname + path.extname(file.originalname));
};

//Destino Nueva imagen de Perfil (Se configura ubicacion + nombre)
var storage = multer.diskStorage({
  destination: dirPaths.newProfileLocation,
  filename: filename,
});

//Destino Actualizar imagen de perfil 
var updateAvatar = multer.diskStorage({
  destination: dirPaths.updateProfileLocation,
  filename: filename,
});

//Destino nueva imagen de producto
var storageProduct = multer.diskStorage({
  destination: dirPaths.newProductLocation,
  filename: function (req, file, cb) {
    cb(null, req.body.name + "-" + file.originalname);
  },
});

var avatarUpload = multer({ storage: storage });
var avatarUpdate = multer({ storage: updateAvatar });
var uploadProduct = multer({ storage: storageProduct });

var productUpload = uploadProduct.fields([
  { name: "imgPortada", maxCount: 1 },
  { name: "gallery", maxCount: 9 },
]);

const upload = {
  avatarUpload,
  avatarUpdate,
  productUpload,
};

module.exports = upload;
