var express = require('express');
var router = express.Router();

var productControllers = require('../controllers/productControllers');
const upload = require('../middlewares/helperMulter');




/* GET home page. */

//router.get('/', productControllers.index)
router.get('/detail/:id/:category', productControllers.productos)

/* GET Login page. */
router.get('/add', productControllers.add);
router.post('/add', upload.productUpload , productControllers.store);


router.get('/:id/edit', productControllers.edit);
router.put('/:id/edit', productControllers.editStorage);
router.delete('/:id/delete', productControllers.delete);

router.get('/', productControllers.todosLosProductos);


module.exports = router;