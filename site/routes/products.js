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
  //var cpUpload = upload.fields([{ name: 'image', maxCount: 1 }, { name: 'gallery', maxCount: 8 }])

/* GET home page. */

//router.get('/', productControllers.index)
router.get('/detail/:id/:category', productControllers.productos)

/* GET Login page. */
router.get('/add', productControllers.add);
router.post('/add', upload.array('img-products', 8), productControllers.store);



module.exports = router;