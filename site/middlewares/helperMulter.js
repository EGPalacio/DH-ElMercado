const fs = require('fs');
const path = require('path');

// Require Sequelize
const db = require('../server/models');
const { Sequelize } = require('../server/models');
const Op = Sequelize.Op


const multer = require("multer");





var storage = multer.diskStorage({
  
    destination: function(req, file, cb) {

      db.User.max('id').then(max => {
        
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
      db.Product.max('id').then(max => {
        // this will return 40
        let lastId = max + 1;
        prodIdPath2 = path.join(__dirname, '../public/images/products/' + lastId)
        if (!fs.existsSync(prodIdPath2)){
          fs.mkdirSync(prodIdPath2);
          };
        cb(null, prodIdPath2);
      }) 
    },
    filename: function (req, file, cb) {
      cb(null, req.body.name + '-' + file.originalname)
    }
  })
   
var uploadProduct = multer({ storage: storageProduct })
var productUpload = uploadProduct.fields([{ name: 'imgPortada', maxCount: 1 }, { name: 'img-products', maxCount: 9 }]) 





const upload = {
    avatarUpload,
    productUpload
     
};

module.exports = upload;