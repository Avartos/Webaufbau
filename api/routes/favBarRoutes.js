const express = require('express');
const router = express.Router();
const favBarController = require('../controllers/favBarController');



router.get('/threads', favBarController.findFavorites )

module.exports = router;