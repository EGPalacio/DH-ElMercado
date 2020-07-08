const fs = require('fs');
const path = require('path');
const { check, validationResult } = require('express-validator');

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

      if (file.mimetype != "image/png" || file.mimetype != "image/jpg" || file.mimetype != "image/jpeg") {

        let nombre = '.error';
     
        cb(null, nombre );
      } else {
        cb(null, req.body.first_name + path.extname(file.originalname));
      }

        
    },
   
});



var avatarUpload = multer({ 
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
      cb(null, true);
    } else {
      cb(null, true);
      
     
     
        
        

    }
  }
   });
   



var updateAvatar = multer.diskStorage({
  
  destination: function(req, file, cb) {

    
      
      let id =req.params.id;
      userId = path.join(__dirname, '../public/images/users/' +id)
      
      cb(null, userId);
    
  },
  filename: function(req, file, cb) {
    
      cb(null, file.fieldname + path.extname(file.originalname));
  },
});

var avatarUpdate = multer({ storage: updateAvatar });

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
    avatarUpdate,
    productUpload,
    
   
   
     
};

module.exports = upload;