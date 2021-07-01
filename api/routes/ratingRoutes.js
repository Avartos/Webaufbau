const express = require('express');
const router = express.Router();
const ratingController = require('../controllers/ratingController');

// get all ratings
router.get('/', ratingController.findAll);
// get one rating by the given id
router.get('/:id', ratingController.findOne);

module.exports = router;