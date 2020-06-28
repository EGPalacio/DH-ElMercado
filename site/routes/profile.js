var express = require('express');
var router = express.Router();
var profileController = require('../controllers/profileController');

let upload = require('../middlewares/helperMulter');
let perfil = upload.avatarUpdate.any();

router.get('/profile', profileController.profile);
router.get('/profile/edit/:id', profileController.edit);
router.post('/profile/edit/:id', perfil, profileController.save);

module.exports = router;