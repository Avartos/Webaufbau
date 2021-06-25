const express = require('express');
const router = express.Router();
const ratingController = require('../controllers/ratingController');

router.get('/', ratingController.findAll);
router.get('/:id', ratingController.findOne);

module.exports = router;