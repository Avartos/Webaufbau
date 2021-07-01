const express = require('express');
const router = express.Router();
const subscribedForumController = require('../controllers/subscribedForumController');

// get all subscribed forums for the current user
router.get('/', subscribedForumController.findAll);
// get one specific subscribed forum by a given id
router.get('/:id', subscribedForumController.findOne);

module.exports = router;