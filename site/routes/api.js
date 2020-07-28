var express = require('express');
var router = express.Router();

const {listAll, findOne, updateOne, destroyOne, createOne} = require('../controllers/apiControllers/userControllers');


//Endpoint List Users
router.get("/users/", listAll);
router.get("/users/:id", findOne);
router.patch("/users/:id", updateOne);
router.delete("/users/:id", destroyOne);
router.post("/users/", createOne);



module.exports = router;