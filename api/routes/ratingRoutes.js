const express = require('express');
const router = express.Router();
const ratingController = require('../controllers/ratingController');
const authMiddleware = require('../middlewares/authMiddleware') ;

// get all ratings
router.get('/', ratingController.findAll);
// get one rating by the given id
router.get('/:id', ratingController.findOne);

router.post('/:id',authMiddleware.validateToken, ratingController.updateRating);

module.exports = router;