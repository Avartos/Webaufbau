const express = require('express');
const router = express.Router();
const forumController = require('../controllers/forumController');

router.get('/', forumController.findAll);
router.get('/:id', forumController.findOne);

module.exports = router;