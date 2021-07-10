const express = require('express');
const router = express.Router();
const forumController = require('../controllers/forumController');
const authMiddleware = require('../middlewares/authMiddleware');

// get all forums
router.get('/', forumController.findAll);
// get a forum with a given id
router.get('/:id', authMiddleware.extractUserFromToken, forumController.findOne);

router.get('/dirk', forumController.countThreads);

module.exports = router;