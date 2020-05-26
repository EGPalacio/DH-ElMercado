var express = require('express');
var router = express.Router();
const path = require('path');
var productControllers = require('../controllers/productControllers');


const multer = require('multer');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/images/')
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + file.originalname)
    }
  })
   
  var upload = multer({ storage: storage })
  var cpUpload = upload.fields([{ name: 'imgPortada', maxCount: 1 }, { name: 'img-products', maxCount: 9 }])

/* GET home page. */

//router.get('/', productControllers.index)
router.get('/detail/:id/:category', productControllers.productos)

/* GET Login page. */
router.get('/add', productControllers.add);
router.post('/add', cpUpload, productControllers.store);



module.exports = router;