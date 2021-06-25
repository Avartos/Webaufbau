const express = require('express');
const router = express.Router();
const imagesController = require('../controllers/imageController');

router.get('/', imagesController.findAll);
router.get('/:id', imagesController.findOne);

module.exports = router;