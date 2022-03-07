const express = require('express');
const router = express.Router();

const stuffCtrl = require('../controllers/stuff');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

router.post('/', auth, multer, stuffCtrl.createSauce);
router.get('/', auth, stuffCtrl.getAllSauce);
router.get('/:id', auth, stuffCtrl.getOneSauce);
router.delete('/:id', auth, multer, stuffCtrl.deleteSauce);
router.put('/:id', auth, multer, stuffCtrl.modifySauce);

router.post('/:id/like', stuffCtrl.likeSauce);

module.exports = router;