const express = require('express');
const router = express.Router();
const imagesController = require('../controllers/imagesController');

router.get('/', imagesController.findAll);
router.get('/:id', imagesController.findOne);

module.exports = router;