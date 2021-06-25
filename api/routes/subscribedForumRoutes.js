const express = require('express');
const router = express.Router();
const subscribedForumController = require('../controllers/subscribedForumController');

router.get('/', subscribedForumController.findAll);
router.get('/:id', subscribedForumController.findOne);

module.exports = router;