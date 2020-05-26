const multer = require("multer");

const maestroPath = require("./GlobalVariables");

var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, maestroPath.Avatar);
    },
    filename: function(req, file, cb) {
        cb(null, file.fieldname + "-" + file.originalname);
    },
});

var avatarUpload = multer({ storage: storage });

var storageProduct = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, maestroPath.Product)
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + file.originalname)
    }
  })
   
var uploadProduct = multer({ storage: storageProduct })
var productUpload = uploadProduct.fields([{ name: 'imgPortada', maxCount: 1 }, { name: 'img-products', maxCount: 9 }]) 





const upload = {
    avatarUpload,
    productUpload
    
    
   
};

module.exports = upload;