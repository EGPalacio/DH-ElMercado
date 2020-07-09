var express = require('express');
var router = express.Router();

var productControllers = require('../controllers/productControllers');
const upload = require('../middlewares/helperMulter');
const gestUserCheck = require('../middlewares/guestUserCheck');

const addProdValidate = require('../middlewares/addProductValidation');

/* GET home page. */

//router.get('/', productControllers.index)
router.get('/products/detail/:id/:category', productControllers.productos)

/* GET Login page. */
router.get('/products/create', gestUserCheck.userCheck, productControllers.add);
router.post('/products/create', upload.productUpload, addProdValidate.storeValidation, productControllers.store);


router.get('/products/:id/edit', gestUserCheck.userCheck, productControllers.edit);
router.put('/products/:id/edit', productControllers.editStorage);
router.delete('/products/:id/delete', productControllers.delete);

router.get('/products/', productControllers.todosLosProductos);
router.get('/products/:id', productControllers.detalleProductos);


module.exports = router;