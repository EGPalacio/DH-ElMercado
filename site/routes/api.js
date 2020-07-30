var express = require('express');
var router = express.Router();

const userRouter = require('./api/users');
const productRouter = require('./api/products');

router.use(userRouter).use(productRouter)



module.exports = router;