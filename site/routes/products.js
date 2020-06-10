var express = require('express');
var router = express.Router();

var productControllers = require('../controllers/productControllers');
const upload = require('../middlewares/helperMulter');
const gestUserCheck = require('../middlewares/guestUserCheck');



/* GET home page. */

//router.get('/', productControllers.index)
router.get('/detail/:id/:category', productControllers.productos)

/* GET Login page. */
router.get('/create', gestUserCheck, productControllers.add);
router.post('/create', upload.productUpload, productControllers.store);


router.get('/:id/edit', gestUserCheck, productControllers.edit);
router.put('/:id/edit', productControllers.editStorage);
router.delete('/:id/delete', productControllers.delete);

router.get('/', productControllers.todosLosProductos);
router.get('/:id', productControllers.detalleProductos);


module.exports = router;