const express = require('express');
const router = express.Router();
const favBarController = require('../controllers/favBarController');
const authMiddleware = require('../middlewares/authMiddleware');

// get the liked threads
router.get('/favorites', authMiddleware.validateToken, favBarController.findFavorites)
// get the the threads with the most contributions
router.get('/popular', favBarController.findPopular)
// get the latest threads
router.get('/latest', favBarController.findLatest)

module.exports = router;