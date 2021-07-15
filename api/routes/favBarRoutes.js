const express = require('express');
const router = express.Router();
const favBarController = require('../controllers/favBarController');
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/favorites', authMiddleware.validateToken, favBarController.findFavorites)
router.get('/popular', favBarController.findPopular)
router.get('/latest', favBarController.findLatest)

module.exports = router;