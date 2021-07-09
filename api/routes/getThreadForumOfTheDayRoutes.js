const express = require('express');
const router = express.Router();
const getThreadForumOfTheDayController = require('../controllers/getThreadForumOfTheDayController')

router.get('/thread/:id', getThreadForumOfTheDayController.getOneThread);

router.get('/forum/:id', getThreadForumOfTheDayController.getOneForum);

module.exports = router;