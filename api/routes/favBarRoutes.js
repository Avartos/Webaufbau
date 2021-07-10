const express = require('express');
const router = express.Router();
const favBarController = require('../controllers/favBarController');



router.get('/favorites', favBarController.findFavorites )
router.get('/popular', favBarController.findPopular )
router.get('/latest', favBarController.findLatest )

module.exports = router;