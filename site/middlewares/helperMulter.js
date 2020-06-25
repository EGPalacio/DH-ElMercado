const fs = require('fs');
const path = require('path');

// Require Sequelize
const db = require('../server/models');
const { Sequelize } = require('../server/models');
const Op = Sequelize.Op


const multer = require("multer");

const maestroPath = require("./GlobalVariables");



var storage = multer.diskStorage({
  
    destination: function(req, file, cb) {

      db.User.max('id').then(max => {
        // this will return 40
        let lastId = max + 1;
        userIdPath2 = path.join(__dirname, '../public/images/users/' + lastId)
        if (!fs.existsSync(userIdPath2)){
          fs.mkdirSync(userIdPath2);
          };
        cb(null, userIdPath2);
      }) 

        
    },
    filename: function(req, file, cb) {
        cb(null, req.body.first_name + path.extname(file.originalname));
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