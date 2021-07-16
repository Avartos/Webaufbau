const express = require('express');
const router = express.Router();
const randomController = require('../controllers/randomController')
const apiTokenMiddleware  = require('../middlewares/apiTokenMiddleware')

router.get('/thread',apiTokenMiddleware.validateApiToken, randomController.getOneThread);

router.get('/forum',apiTokenMiddleware.validateApiToken, randomController.getOneForum);

module.exports = router;