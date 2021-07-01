const express = require('express');
const router = express.Router();
const forumController = require('../controllers/forumController');

// get all forums
router.get('/', forumController.findAll);
// get a forum with a given id
router.get('/:id', forumController.findOne);

module.exports = router;