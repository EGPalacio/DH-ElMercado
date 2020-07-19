const fs = require('fs');
const path = require('path');

const newId = require ('./newId');

// Require Sequelize
const db = require("../server/models");
const { Sequelize } = require("../server/models");
const Op = Sequelize.Op;

const userIdPath = newId.userIdPath;

if (!fs.existsSync(userIdPath)){
    fs.mkdirSync(userIdPath);
    };


const newProfileLocation = function (req, file, cb) {
    console.log(req.files);
    db.User.max("id").then((max) => {
      let lastId = max + 1;
      userIdPath2 = path.join(__dirname, "../public/images/users/" + lastId);
      if (!fs.existsSync(userIdPath2)) {
        fs.mkdirSync(userIdPath2);
      }
      cb(null, userIdPath2);
    });
  }

const updateProfileLocation = function (req, file, cb) {
    let id = req.params.id;
    userId = path.join(__dirname, "../public/images/users/" + id);
    cb(null, userId);
}

const newProductLocation = function (req, file, cb) {
    db.Product.max("id").then((max) => {
      // this will return 40
      let lastId = max + 1;
      prodIdPath2 = path.join(__dirname, "../public/images/products/" + lastId);
      if (!fs.existsSync(prodIdPath2)) {
        fs.mkdirSync(prodIdPath2);
      }
      cb(null, prodIdPath2);
    });
  }

const productIdPath = () =>{
    newId.productIdPath;
    if (!fs.existsSync(productIdPath)){
        fs.mkdirSync(productIdPath);   
        }
};


const dirPaths = {
    productIdPath,
    newProfileLocation ,
    updateProfileLocation ,
    newProductLocation,
}



module.exports = dirPaths;