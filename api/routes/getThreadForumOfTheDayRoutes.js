const express = require('express');
const router = express.Router();
const getThreadForumOfTheDayController = require('../controllers/getThreadForumOfTheDayController')
const apiTokenMiddleware  = require('../middlewares/apiTokenMiddleware')

router.get('/thread',apiTokenMiddleware.validateApiToken, getThreadForumOfTheDayController.getOneThread);

router.get('/forum',apiTokenMiddleware.validateApiToken, getThreadForumOfTheDayController.getOneForum);

module.exports = router;