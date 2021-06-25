const express = require('express');
const router = express.Router();
const imagesController = require('../controllers/imageController');

// get all images
router.get('/', imagesController.findAll);
// get the image by a given id
router.get('/:id', imagesController.findOne);

module.exports = router;